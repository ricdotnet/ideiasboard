import { Store } from '@idevelopthings/vue-class-stores/vue';

interface UserStoreInterface {
  email: string;
  boards: any[];
}

class UserStore extends Store<UserStore, UserStoreInterface>() {
  get state() {
    return {
      email: '',
      boards: [],
    };
  }
}

export const userStore = new UserStore();
