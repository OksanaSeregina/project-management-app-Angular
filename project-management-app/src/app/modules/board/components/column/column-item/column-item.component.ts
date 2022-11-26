import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import isEqual from 'lodash/isEqual';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { IColumn, TaskResp, TaskSetReq, TasksFacade, UserData, UserFacade } from '../../../../../core';
import { ITaskDialog, ITaskDialogAction, TaskDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private _value: IColumn;

  public isEditable = false;
  public title = '';
  public tasks: TaskResp[];
  public user: UserData | null;

  @Input() public columns: IColumn[];
  @Input() public columnsIds: string[];
  @Input()
  public set value(column: IColumn) {
    this._value = column;
    this.title = column.title;
  }

  public get value(): IColumn {
    return this._value;
  }

  @Output() public update = new EventEmitter<IColumn>();
  @Output() public delete = new EventEmitter<IColumn>();
  @Output() public editableState = new EventEmitter<boolean>();

  constructor(private tasksFacade: TasksFacade, private userFacade: UserFacade, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.subscription = this.tasksFacade.tasks$.subscribe(
      (tasks) => (this.tasks = this.sort(tasks[this.value._id] || [])),
    );
    this.subscription.add(this.userFacade.user$.subscribe((item) => (this.user = item)));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public toggle(): void {
    this.isEditable = !this.isEditable;
    this.editableState.emit(this.isEditable);
  }

  public revertColumn(): void {
    this.title = this.value.title;
    this.toggle();
  }

  public updateColumn(): void {
    this.update.emit({ ...this.value, title: this.title });
  }

  public deleteColumn(): void {
    this.delete.emit(this.value);
  }

  public drop(event: CdkDragDrop<TaskResp[]>): void {
    let tasks: TaskSetReq[] = this.tasks;
    if (event.previousContainer === event.container) {
      if (event.previousIndex !== event.currentIndex) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        tasks = event.container.data.map(({ _id, columnId }, order) => ({ _id, order, columnId }));
      }
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      tasks = [
        ...event.previousContainer.data.map(({ _id, order, columnId }) => ({ _id, order, columnId })),
        ...event.container.data.map(({ _id }, order) => ({ _id, order, columnId: event.container.id })),
      ];
    }
    // NOTE: avoid to request data if no changes
    if (!isEqual(tasks, this.tasks)) {
      this.tasksFacade.updateTasksSet(this.tasks[0].boardId, this.columns, tasks);
    }
  }

  private sort(tasks: TaskResp[]): TaskResp[] {
    return [...tasks].sort((a, b) => a.order - b.order);
  }

  public createTask(): void {
    this.openDialog({ title: 'components.tasks.add', action: ITaskDialogAction.Create });
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
            _id: '',
            title: data.task.title,
            order: 0,
            boardId: this.value.boardId,
            columnId: this.value._id,
            description: data.task.description || ' ',
            userId: this.user?._id || '',
            users: data.task.users || [],
          };
          this.tasksFacade.createTask(taskReq);
        }
      });
  }
}
