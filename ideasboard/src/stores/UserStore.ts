import { defineStore } from 'pinia';
import { IUserBoards } from '../types';

const useUserStore = defineStore('user', {
  state: () => ({
    email: <string>'',
    boards: <IUserBoards>{},
  }),
});

export {
  useUserStore
};
