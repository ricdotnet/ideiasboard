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
