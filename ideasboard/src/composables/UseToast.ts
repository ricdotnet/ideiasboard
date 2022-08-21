import { Ref, ref, UnwrapRef } from 'vue';
import { unwrap } from '../utils';

type Toasts = Ref<UnwrapRef<IToast[]>>
type ToastType = string & 'success' | 'error' | 'warning';

export interface IToast {
  type: ToastType;
  content: string;
  id: number;
}

const toasts: Toasts = ref([]);
let interval: NodeJS.Timer | undefined;

export const useToast = () => {

  const addToast = (type: ToastType, content: string): void => {
    if ( toasts.value.length === 5 ) {
      toasts.value.shift();
    }
    const toastId: number = Date.now();
    toasts.value.push({ type, content, id: toastId });
    clearToasts();
  };

  const getToasts = (): IToast[] | null => {
    return unwrap<IToast[]>(toasts);
  };

  const removeToast = (id: number): void => {
    toasts.value.splice(toasts.value.findIndex((t: IToast) => t.id === id), 1);
  };

  const clearToasts = (): void => {
    if ( typeof interval === 'undefined' ) {
      interval = setInterval(() => {
        if ( toasts.value.length === 0 ) {
          clearInterval(interval);
          interval = undefined;
        }
        if ( toasts.value.length > 0 && Date.now() - toasts.value[0].id >= 5000 ) {
          toasts.value.shift();
        }
      }, 1000);
    }
  };

  return {
    addToast,
    getToasts,
    removeToast,
  };
};
