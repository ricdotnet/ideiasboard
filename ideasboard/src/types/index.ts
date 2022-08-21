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

export interface IListBoard {
  key: string;
  name: string;
  ideias: number;
}

export interface IUserBoards {
  owned: IListBoard[];
  other: IListBoard[];
}

export type Toasts = Ref<UnwrapRef<IToast[]>>
export type ToastType = 'success' | 'error' | 'warning';

export interface IToast {
  type: ToastType;
  content: string;
  id: number;
}
