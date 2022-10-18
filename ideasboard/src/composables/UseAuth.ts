import { ref } from 'vue';
import axios, { AxiosResponse } from 'axios';
import { useLocalStorage } from './UseLocalStorage';

type UseAuthReturn = {
  error: string | undefined;
  data: AuthResponse | undefined;
}

type AuthResponse = AxiosResponse & { token: string };

const useAuth = () => {
  const api = import.meta.env.VITE_API;
  const { remove } = useLocalStorage();

  // authenticate user via email
  const emailAuth = async (email: string): Promise<UseAuthReturn> => {
    const data = ref<AuthResponse>();
    const error = ref<string>();

    const params = new URLSearchParams();
    params.append('email', email.replace(' ', '').trim());

    try {
      const response = await axios.post(`${api}/auth`, params);
      data.value = response.data;
    } catch (err) {
      error.value = 'something went wrong....';
    }

    return { error: error.value, data: data.value };
  };

  // authenticate user via link sent to email
  const tokenAuth = async (token: string): Promise<UseAuthReturn> => {
    const data = ref<AuthResponse>();
    const error = ref<string>();

    try {
      const response: AxiosResponse = await axios.post(`${api}/auth/${token}`);
      data.value = response.data;
    } catch (err) {
      error.value = 'could not authenticate';
    }

    return { error: error.value, data: data.value };
  };

  // TODO: refactor this bit
  // authenticate current logged-in user
  const authenticate = async (token: string): Promise<any> => {
    let data: any = null;
    let error: any = null;

    try {
      const response: any = await axios.post(`${api}/auth/verify`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      data = response.data;
    } catch (err) {
      error = err;
    }

    return {
      error, data
    };
  };

  const logout = () => {
    remove('token');
    return window.location.href = '/';
  };

  return {
    emailAuth,
    tokenAuth,
    authenticate,
    logout,
  };
};

export { useAuth };
