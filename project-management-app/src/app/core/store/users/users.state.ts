import { UserResp } from '../../models';

export interface UsersState {
  users: UserResp[];
  loading: boolean;
  loaded: boolean;
}
