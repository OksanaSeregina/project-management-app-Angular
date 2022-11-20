import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ColumnFacade, NotificationService } from '../../../../core';
import { BoardModalComponent, IBoardModal, IBoardModalAction, INavigateButton } from '../../../shared';
import { IColumn } from '../../models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private boardId: string;

  public columns$: Observable<IColumn[]>;
  buttons: INavigateButton[] = [
    {
      icon: 'add',
      value: this.translate.instant('column.add_column'),
      isVisibleForUser: true,
      route: 'add',
    },
  ];

  constructor(
    private columnFacade: ColumnFacade,
    private dialog: MatDialog,
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

    this.columns$ = this.columnFacade.columns$.pipe(map((columns: IColumn[]) => this.sort(columns)));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public updateColumn(column: IColumn): void {
    this.openDialog({ title: 'column.edit_column', action: IBoardModalAction.Update, board: column });
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

  private sort(columns: IColumn[]): IColumn[] {
    return [...columns].sort((a, b) => (<string>a._id).localeCompare(<string>b._id, undefined, { numeric: false }));
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
          switch (data.action) {
            case IBoardModalAction.Create:
              this.columnFacade.createColumn(this.boardId, { ...data.board, order: 0 });
              break;
            case IBoardModalAction.Update:
              this.columnFacade.updateColumn(this.boardId, <Pick<IColumn, '_id' | 'title' | 'order'>>data.board);
              break;
          }
        }
      });
  }
}
