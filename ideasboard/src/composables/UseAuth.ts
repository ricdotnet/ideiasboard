import { ref } from 'vue';
import axios, { AxiosResponse } from 'axios';

type UseAuthReturn = {
  error: string | undefined;
  data: AuthResponse | undefined;
}

type AuthResponse = AxiosResponse & { token: string };

const useAuth = () => {
  const api = import.meta.env.VITE_API;

  const doAuth = async (email: string): Promise<UseAuthReturn> => {
    const data = ref<AuthResponse>();
    const error = ref<string>();

    const params = new URLSearchParams();
    params.append('email', email.replace(' ', '').trim());

    try {
      const response = await axios.post(`${api}/api/auth`, params);
      data.value = response.data;
    } catch (err) {
      error.value = 'something went wrong....';
    }

    return { error: error.value, data: data.value };
  };

  const doTokenAuth = async (token: string): Promise<UseAuthReturn> => {
    const data = ref<AuthResponse>();
    const error = ref<string>();

    try {
      const response: AxiosResponse = await axios.post(`${api}/api/auth/${token}`);
      data.value = response.data;
    } catch (err) {
      error.value = 'could not authenticate';
    }

    return { error: error.value, data: data.value };
  };

  return {
    doAuth,
    doTokenAuth
  };
};

export { useAuth };
