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

export interface IUserBoards {
  owned: [];
  other: [];
}
