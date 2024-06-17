import { defineStore } from 'pinia';
import type { Inflation, Transaction } from '@/types/data';

export const useDataStore = defineStore('data', {
  state: () => ({
    inflations: [] as Inflation[],
    accounts: {} as Transaction[],
  }),
  actions: {
    addUniqueAccounts(newAccounts: Transaction[]) {
      for (const key in newAccounts) {
        this.accounts[key] = newAccounts[key];
      }
    },
  },
});
