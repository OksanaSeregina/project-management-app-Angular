import { BoardState } from './board';
import { CommonState } from './common';

export interface AppState {
  common: CommonState;
  boards: BoardState;
}
