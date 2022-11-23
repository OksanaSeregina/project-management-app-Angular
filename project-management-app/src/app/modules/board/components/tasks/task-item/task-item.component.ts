import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumn, TaskResp, TasksFacade } from '../../../../../core/';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() public task: TaskResp;
  @Input() public columns: IColumn[];

  @Output() public update = new EventEmitter<TaskResp>();
  @Output() public delete = new EventEmitter<TaskResp>();

  constructor(private tasksFacade: TasksFacade) {}

  public updateTask(): void {
    this.update.emit(this.task);
  }

  public deleteTask(): void {
    this.delete.emit(this.task);
  }
}
