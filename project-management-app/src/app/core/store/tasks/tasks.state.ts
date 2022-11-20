import { TaskResp } from '../../../modules/board/models/task.model';

export interface TasksState {
  [key: string]: TaskResp[];
}
