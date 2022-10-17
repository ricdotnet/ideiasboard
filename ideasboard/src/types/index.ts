import { Ref, UnwrapRef } from 'vue';

export interface IBoard {
  key: string;
  name: string;
  ideias: IIdea[];
}

export interface IIdea {
  id: number;
  content: string;
  likes: number;
}

export interface IBoardPageState {
  loading: boolean;
  board: IBoard;
  ideias: IIdea[];
  isAddingIdeia: boolean;
}

export interface ICreateBoardDialog {
  onCreateBoardOpen: () => void;
}

export interface IAddIdeiaDialog {
  onAddIdeiaOpen: () => void;
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
  created_at: string;
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
