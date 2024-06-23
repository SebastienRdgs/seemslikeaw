import { defineStore } from 'pinia';
import type { Inflation, Transaction } from '@/types/data';

export const useDataStore = defineStore('data', {
  state: () => ({
    inflations: [] as Inflation[],
    accounts: [] as any[],
    finalAccounts: [] as Transaction[],
    allAccounts: [] as { time: string; values: number[] }[], // Changement ici pour un tableau de valeurs
  }),
  actions: {
    addUniqueAccounts(newAccounts: Transaction[][]) {
      console.log('addUniqueAccounts', newAccounts);

      // Trouver les dates uniques dans toutes les transactions
      const uniqueDates = new Set<string>();
      for (const i in newAccounts) {
        for (const y in newAccounts[i]) {
          uniqueDates.add(newAccounts[i][y].time);
        }
      }

      // Initialiser le tableau allAccounts
      this.allAccounts = Array.from(uniqueDates).map((date) => ({
        time: date,
        values: Array(newAccounts.length).fill(0), // Initialiser les valeurs à 0
      }));

      // Remplir le tableau avec les valeurs correspondantes
      for (const i in newAccounts) {
        for (const y in newAccounts[i]) {
          const transaction = newAccounts[i][y];
          for (let j = 0; j < this.allAccounts.length; j++) {
            if (this.allAccounts[j].time === transaction.time) {
              this.allAccounts[j].values.push(transaction.value);
              break; // Sortir de la boucle une fois trouvé
            }
          }
        }
      }

      // Trier les dates
      this.allAccounts.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

      // Compléter finalAccounts et accounts si nécessaire
      this.finalAccounts = this.allAccounts.map((a) => ({
        time: a.time,
        value: a.values.reduce((sum, v) => sum + v, 0), // Somme des valeurs pour chaque date
      }));

      // for (const account in newAccounts) {
      //   console.log('ici', newAccounts[account]);
      //   this.accounts = newAccounts[account].map((account: Transaction[], index) => ({
      //     account,
      //     firsttime: account.reduce((earliest, current) => {
      //       return new Date(current.time) < new Date(earliest.time) ? current : earliest;
      //     }),
      //   }));
      // }

      console.log('finalAccounts', this.finalAccounts);
      console.log('accounts', this.accounts);
      console.log('allAccounts', this.allAccounts);
    },
  },
});
