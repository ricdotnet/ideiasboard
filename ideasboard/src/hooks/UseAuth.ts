import axios from 'axios';

interface UseAuthReturn {
  error: string | undefined;
  data: string | undefined;
}

const useAuth = () => {
  const api = import.meta.env.VITE_API;

  const doAuth = async (email: string): Promise<UseAuthReturn> => {
    let data, error;

    try {
      const response = await axios.post(`${api}/api/auth`, { email });
      data = response.data;
    } catch (err) {
      error = 'something went wrong....';
    }

    return { error, data };
  };

  const doTokenAuth = async (token: string): Promise<UseAuthReturn> => {
    let data, error;

    try {
      const response = await axios.post(`${api}/api/auth/${token}`);
      data = response.data;
    } catch (err) {
      error = 'could not authenticate';
    }

    return { error, data };
  };

  return {
    doAuth,
    doTokenAuth
  };
};

export { useAuth };
