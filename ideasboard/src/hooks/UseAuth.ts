import axios from 'axios';

const useAuth = () => {
  const api = import.meta.env.VITE_API;

  const doAuth = async (email: string) => {
    try {
      const { data } = await axios.post(`${api}/api/auth`, { email });
      console.log(data);
    } catch (error) {
      // ignore for now
    }
  };

  return {
    doAuth
  };
};

export { useAuth };
