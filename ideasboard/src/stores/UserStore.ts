import { defineStore } from 'pinia';
import { Board } from '../types';

const useUserStore = defineStore('user', {
  state: () => ({
    email: <string>'',
    boards: <Board[]>[],
  }),
});

export {
  useUserStore
};
