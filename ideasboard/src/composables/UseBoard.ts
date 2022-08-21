import axios, { AxiosResponse } from 'axios';
import { useLocalStorage } from './UseLocalStorage';
import { useUserStore } from '../stores';

export const useBoard = () => {
  const api = import.meta.env.VITE_API;
  const { value } = useLocalStorage();
  const userStore = useUserStore();

  const getBoard = async (id: string) => {

  };

  const getAllBoards = async () => {
    const email = userStore.email;

    const params = new URLSearchParams();
    params.append('email', email);

    const response: AxiosResponse = await axios.post(`${api}/api/board/all`, params, {
      headers: {
        'Authorization': `Bearer ${value('token')?.value}`,
      }
    });

    userStore.boards = response.data.boards;
  };

  return {
    getBoard,
    getAllBoards,
  };
};