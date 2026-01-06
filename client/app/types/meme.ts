export interface Meme {
  _id: string;
  id: string;
  name: string;
  url: string;
}

export interface EditModalState {
  isOpen: boolean;
  meme: Meme | null;
  newName: string;
  isLoading: boolean;
}
