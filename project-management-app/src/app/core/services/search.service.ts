import { Injectable } from '@angular/core';
import { TaskResp } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchByTasks(search: string, allTasks: TaskResp[]): TaskResp[] {
    const taskReq = allTasks.slice();
    const searchReq = search.toLowerCase();

    const taskResp: TaskResp[] = taskReq.filter((item) => {
      const title = item.title.toLowerCase() === searchReq;
      const description = item.description.toLowerCase().includes(searchReq);
      const userId = item.userId.toLowerCase() === searchReq;
      const users = item.users.find((item) => item.toLowerCase() === searchReq);
      return title || description || userId || users?.length;
    });

    return taskResp;
  }
}
