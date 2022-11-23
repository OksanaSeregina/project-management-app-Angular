import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService, TasksFacade, IColumn, TaskResp } from '../../../../core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() public value: IColumn;

  private subscription: Subscription;

  public tasks$: Observable<TaskResp[]>;

  constructor(
    private tasksFacade: TasksFacade,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.tasks$ = this.tasksFacade.getTasksByColumn(this.value._id);
  }

  public updateTask(task: TaskResp): void {}

  public deleteTask(task: TaskResp): void {
    const message = `${this.translate.instant('components.confirmation-task.message')}: ${task.title}?`;
    const okCallback = (): void => this.tasksFacade.deleteTask(task.boardId, task.columnId, task._id);
    const title = this.translate.instant('components.confirmation-task.title');
    this.notificationService.confirm(message, okCallback, title);
  }
}
