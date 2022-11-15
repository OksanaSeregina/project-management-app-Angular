import { UserData } from '../../models';

export interface UserState {
  user: UserData | null;
  loading: boolean;
  loaded: boolean;
  error?: boolean;
}
