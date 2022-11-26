import { IBoard, IColumn } from '../../../../../core';

export interface IDialog {
  action: string;
  title?: string;
  board?: IBoard | IColumn;
}
