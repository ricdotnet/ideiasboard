import { Store } from '@idevelopthings/vue-class-stores/vue';
import { IUserBoards } from '../types';
import { useLocalStorage } from '../composables';
import axios from 'axios';

interface UserStoreInterface {
  email: string;
  userBoards: IUserBoards;
  loading: boolean;
}

class UserStore extends Store<UserStore, UserStoreInterface>() {
  get state(): UserStoreInterface {
    return {
      email: '',
      userBoards: <IUserBoards>{},
      loading: false,
    };
  }

  async boards() {
    this.$loading = true;

    const { value } = useLocalStorage();
    const email = userStore.$email;

    const params = new URLSearchParams();
    params.append('email', email);

    const response = await axios.post(`${import.meta.env.VITE_API}/board/all`, params, {
      headers: {
        'Authorization': `Bearer ${value('token')?.value}`,
      }
    });

    this.$userBoards = response.data.boards;
    this.$loading = false;
  }
}

export const userStore = new UserStore();
