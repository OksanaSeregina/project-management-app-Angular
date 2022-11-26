import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ITaskDialog, ITaskDialogAction, TaskDialogComponent } from '../../../shared';
import { ColumnFacade, NotificationService, TaskResp, TasksFacade } from '../../../../core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  private _tasks: TaskResp[];

  @Input()
  public set tasks(value: TaskResp[]) {
    this._tasks = this.sort(value);
  }

  public get tasks(): TaskResp[] {
    return this._tasks;
  }

  constructor(
    private tasksFacade: TasksFacade,
    private columnFacade: ColumnFacade,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  public updateTask(task: TaskResp): void {
    this.openDialog({ title: 'components.tasks.edit', action: ITaskDialogAction.Update, task: task });
  }

  public deleteTask(task: TaskResp): void {
    const message = `${this.translate.instant('components.confirmation-task.message')}: ${task.title}?`;
    const okCallback = (): void => this.tasksFacade.deleteTask(task.boardId, task.columnId, task._id);
    const title = this.translate.instant('components.confirmation-task.title');
    this.notificationService.confirm(message, okCallback, title);
  }

  private sort(tasks: TaskResp[]): TaskResp[] {
    return [...tasks].sort((a, b) => a.order - b.order);
  }

  private openDialog(data: ITaskDialog): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '50vw',
      data,
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((data: ITaskDialog) => {
        if (data?.task) {
          const taskReq: TaskResp = {
            _id: data.task._id,
            title: data.task.title,
            order: data.task.order,
            boardId: data.task.boardId,
            columnId: data.task.columnId,
            description: data.task.description,
            userId: data.task.userId,
            users: data.task.users || [],
          };
          this.tasksFacade.updateTask(taskReq);
        }
      });
  }
}
