import { Ref, UnwrapRef } from 'vue';

export type Board = {
  title: string;
  ideas: any[];
}

export interface ICreateBoardDialog {
  onCreateBoardOpen: () => void;
}

export interface ILoginDialog {
  onLoginOpen: () => void;
  onLoginClose: () => void;
}

export interface ILoginActionMessageDialog {
  onLoginActionMessageDialogOpen: () => void;
}

export type Toasts = Ref<UnwrapRef<IToast[]>>
export type ToastType = 'success' | 'error' | 'warning';

export interface IToast {
  type: ToastType;
  content: string;
  id: number;
}
