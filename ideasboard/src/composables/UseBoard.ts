import axios, { AxiosResponse } from 'axios';
import { useLocalStorage } from './UseLocalStorage';
import { userStore } from '../stores/UserStore';

export const useBoard = () => {
  const api = import.meta.env.VITE_API;
  const { value } = useLocalStorage();

  const getBoard = async (id: string) => {
    console.log('empty here...');
  };

  return {
    getBoard,
  };
};
