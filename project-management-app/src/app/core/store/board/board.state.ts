import { IBoard } from '../../models';

/**
 * Board state model
 */
export interface BoardState {
  boards: IBoard[];
}

/**
 * Board state initial setup
 */
export const initialBoardState: BoardState = {
  boards: [],
};
