import { IBoard, IColumn } from '../../../../../core';

export interface IBoardModal {
  action: string;
  title?: string;
  board?: IBoard | IColumn;
}
