import { Store } from '@idevelopthings/vue-class-stores/vue';
import { IUserBoards } from '../types';

interface UserStoreInterface {
  email: string;
  boards: IUserBoards;
}

class UserStore extends Store<UserStore, UserStoreInterface>() {
  get state() {
    return {
      email: '',
      boards: <IUserBoards>{},
    };
  }
}

export const userStore = new UserStore();
