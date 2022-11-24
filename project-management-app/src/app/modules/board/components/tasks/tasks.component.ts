import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ColumnFacade, NotificationService, TaskResp, TasksFacade } from '../../../../core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @Input() public tasks: TaskResp[];

  constructor(
    private tasksFacade: TasksFacade,
    private columnFacade: ColumnFacade,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  public updateTask(task: TaskResp): void {}

  public deleteTask(task: TaskResp): void {
    const message = `${this.translate.instant('components.confirmation-task.message')}: ${task.title}?`;
    const okCallback = (): void => this.tasksFacade.deleteTask(task.boardId, task.columnId, task._id);
    const title = this.translate.instant('components.confirmation-task.title');
    this.notificationService.confirm(message, okCallback, title);
  }
}
