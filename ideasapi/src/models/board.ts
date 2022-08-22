export interface IBoard {
  key: string;
  name: string;
  ideias: number | [];
  created_at: number;
}

export interface IIdeia {
  id: number;
  content: string;
  likes: number;
  created_at: number;
}
