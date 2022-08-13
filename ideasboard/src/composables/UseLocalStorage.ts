import { isRef, Ref } from 'vue';
import { unwrap, wrap } from '../utils';

type UseLocalStorage = {
  store: (key: string, newValue: Value) => void;
  value: (key: string) => Ref | undefined;
  remove: (key: string) => void;
}
type Value = Ref | string | number | object;

export const useLocalStorage = (): UseLocalStorage => {

  const store = (key: string, newValue: Value) => {
    localStorage.setItem(key, JSON.stringify((isRef(newValue)) ? unwrap(newValue) : newValue));
  };

  const value = (key: string) => {
    const v = localStorage.getItem(key);
    if ( !v ) return;
    return wrap(JSON.parse(v));
  };

  const remove = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    store,
    value,
    remove
  };
};
