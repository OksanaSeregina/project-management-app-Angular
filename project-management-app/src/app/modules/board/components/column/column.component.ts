import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import some from 'lodash/some';
import values from 'lodash/values';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BoardFacade, ColumnFacade, IBoard, IColumn, INavigateButton, NotificationService } from '../../../../core';
import { BoardModalComponent, IBoardModal, IBoardModalAction } from '../../../shared';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private boardId: string;
  private _columnEditableState = {};

  public isDragDisabled = false;
  public boardTitle: string;
  public columns: IColumn[];
  public columnsIds: string[];
  public buttons: INavigateButton[] = [
    {
      icon: 'add',
      value: this.translate.instant('column.add_column'),
      isVisibleForUser: true,
      route: 'add',
    },
  ];
  public set columnEditableState(state: { [key: string]: boolean }) {
    this._columnEditableState = state;
    this.isDragDisabled = some(values(state), (value) => !!value);
  }

  constructor(
    private columnFacade: ColumnFacade,
    private boardFacade: BoardFacade,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    const [addBtn] = this.buttons;
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.buttons = [{ ...addBtn, value: this.translate.instant('column.add_column') }];
    });

    this.subscription.add(
      this.route.params.subscribe((params: Params) => {
        this.boardId = params['id'];
        this.columnFacade.loadColumns(this.boardId);
      }),
    );

    this.subscription.add(
      this.boardFacade.boards$.subscribe((boards) => {
        const board: IBoard | undefined = boards.find((board) => board._id === this.boardId);
        if (board) {
          this.boardTitle = board.title;
        }
      }),
    );

    this.subscription.add(
      this.columnFacade.columns$.subscribe((columns: IColumn[]) => {
        this.columns = this.sort(columns);
        this.columnsIds = this.columns.map((column) => column._id);
      }),
    );
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public updateColumn({ title, _id, order }: IColumn): void {
    this.columnFacade.updateColumn(this.boardId, <Pick<IColumn, '_id' | 'title' | 'order'>>{ title, _id, order });
  }

  public deleteColumn(column: IColumn): void {
    const message = this.translate.instant('components.confirmation-column.message');
    const okCallback = (): void => this.columnFacade.deleteColumn(this.boardId, column._id);
    const title = this.translate.instant('components.confirmation-column.title');
    this.notificationService.confirm(message, okCallback, title);
  }

  public navigate(button: INavigateButton): void {
    switch (button.route) {
      case 'add':
        this.openDialog({ title: 'column.add_column', action: IBoardModalAction.Create });
        break;
    }
  }

  public navigateToMain(): void {
    this.router.navigate(['main']);
  }

  public drop(event: CdkDragDrop<IColumn[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const columns: Pick<IColumn, '_id' | 'order'>[] = event.container.data.map(({ _id }, order) => ({ _id, order }));
      this.columnFacade.updateColumnsSet(this.boardId, columns);
    }
  }

  public updateEditableState(value: boolean, column: IColumn): void {
    this.columnEditableState = { ...this._columnEditableState, [column._id]: value };
  }

  private sort(columns: IColumn[]): IColumn[] {
    return [...columns].sort((a, b) => a.order - b.order);
  }

  private openDialog(data: IBoardModal): void {
    const dialogRef = this.dialog.open(BoardModalComponent, {
      width: '50vw',
      data,
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((data: IBoardModal) => {
        if (data?.board) {
          this.columnFacade.createColumn(this.boardId, { ...data.board, order: this.columns?.length || 0 });
        }
      });
  }
}
