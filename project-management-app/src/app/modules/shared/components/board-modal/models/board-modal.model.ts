import { IBoard, IColumn } from '../../../../board';

export interface IBoardModal {
  action: string;
  title?: string;
  board?: IBoard | IColumn;
}
