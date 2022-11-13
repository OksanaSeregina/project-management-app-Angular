import { IBoard } from '../../../modules/board';

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
