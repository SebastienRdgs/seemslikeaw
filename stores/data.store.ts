import { defineStore } from 'pinia';
import type { Inflation, Transaction, Transactions } from '@/types/data';

export const useDataStore = defineStore('data', {
  state: () => ({
    inflations: [] as Inflation[],
    accounts: [] as Array<Transaction[][]>,
    allAccounts: [] as Transactions[],
    priceScaleOptions: {
      visible: true,
    },
  }),
  actions: {
    addUniqueAccounts(newAccounts: Transaction[][]) {
      const uniqueDates = new Set<string>();
      for (const i in newAccounts) {
        for (const y in newAccounts[i]) {
          uniqueDates.add(newAccounts[i][y].time);
        }
      }

      this.accounts.push(newAccounts);

      const dates = Array.from(uniqueDates);
      for (const date of dates) {
        if (!this.allAccounts.some((account) => account.time === date)) {
          this.allAccounts.push({
            time: date,
            values: [],
          });
        }
      }

      this.accounts.sort(
        (a, b) => new Date(Object.values(a)[0][0].time).getTime() - new Date(Object.values(b)[0][0].time).getTime(),
      );
      // console.log(this.accounts);
    },
    updateData() {
      for (let j = 0; j < this.allAccounts.length; j++) {
        for (const i in this.accounts) {
          for (const account of Object.values(this.accounts[i])) {
            if (j === 0) {
              this.allAccounts[j].values[i] =
                account.find((account) => account.time === this.allAccounts[j].time)?.value || 0;
            }
            if (j > 0) {
              const values = account.find((account) => account.time === this.allAccounts[j].time);
              this.allAccounts[j].values[i] = values ? values.value || 0 : 0 || this.allAccounts[j - 1].values[i] || 0;
            }
          }
        }
      }

      console.log(this.allAccounts[this.allAccounts.length - 1]);
      // console.log(this.allAccounts);

      this.allAccounts.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    },
  },
});
