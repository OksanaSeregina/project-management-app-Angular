import { IColumn } from '../../models';

/**
 * Column state model
 */
export interface ColumnState {
  columns: IColumn[];
}

/**
 * Column state initial setup
 */
export const initialColumnState: ColumnState = {
  columns: [],
};
