import { TaskResp } from '../../../../../core';

export interface ITaskDialog {
  action: string;
  title?: string;
  task?: TaskResp;
}
