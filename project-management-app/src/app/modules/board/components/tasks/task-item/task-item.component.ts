import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TaskResp, TasksFacade, UsersFacade } from '../../../../../core/';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {
  @Input() public task: TaskResp;

  @Output() public update = new EventEmitter<TaskResp>();
  @Output() public delete = new EventEmitter<TaskResp>();

  public username = '';

  constructor(private tasksFacade: TasksFacade, private usersFacade: UsersFacade) {}

  public ngOnInit(): void {
    this.usersFacade.getUsersByIds(this.task.users).subscribe((item) => {
      if (item?.length && item[0]) {
        this.username = item[0].login[0];
      }
    });
  }

  public updateTask(): void {
    this.update.emit(this.task);
  }

  public deleteTask(): void {
    this.delete.emit(this.task);
  }
}
