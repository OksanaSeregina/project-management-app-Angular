import { IBoard } from '../../../../board';

export interface IBoardModal {
  action: string;
  title?: string;
  board?: IBoard;
}
