import { Injectable } from '@angular/core';
import { TaskResp } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchByTasks(searchReq: string, allTasks: TaskResp[]): TaskResp[] {
    const taskReq = allTasks.slice();

    const taskResp: TaskResp[] = taskReq.filter((item) => {
      const title = item.title === searchReq;
      const description = item.description.includes(searchReq);
      const userId = item.userId === searchReq;
      const users = item.users.includes(searchReq);
      return title || description || userId || users;
    });

    return taskResp;
  }
}
