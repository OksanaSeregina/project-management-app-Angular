import { BoardState } from './board';
import { CommonState } from './common';
import { UserState } from './user';
import { UsersState } from './users';

export interface AppState {
  common: CommonState;
  boards: BoardState;
  user: UserState;
  users: UsersState;
}
