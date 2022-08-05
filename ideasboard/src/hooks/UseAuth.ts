import axios from 'axios';

const useAuth = () => {
  const api = import.meta.env.VITE_API;

  const doAuth = async (email: string, successCb: any, errorCb: any): Promise<any> => {
    try {
      const { data } = await axios.post(`${api}/api/auth`, { email });
      successCb();
    } catch (error) {
      errorCb('something went wrong....');
      // return error;
    }
  };

  return {
    doAuth
  };
};

export { useAuth };
