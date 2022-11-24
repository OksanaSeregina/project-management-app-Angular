import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BoardFacade, CommonFacade, IBoard, ISort, NotificationService } from '../../core';
import { DialogComponent, IBoardModal, IBoardModalAction } from '../shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public boards$: Observable<IBoard[]>;
  public searchValue$: Observable<string>;
  public sortBy$: Observable<ISort>;
  public isList: boolean;

  constructor(
    private boardFacade: BoardFacade,
    private commonFacade: CommonFacade,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.commonFacade.loadSearchValue();
    this.searchValue$ = this.commonFacade.searchValue$;

    this.commonFacade.loadSortBy();
    this.sortBy$ = this.commonFacade.sortBy$;

    this.commonFacade.loadIsList();
    this.subscription = this.commonFacade.isList$.subscribe((isList: boolean) => (this.isList = isList));

    this.boardFacade.loadBoards();
    this.boards$ = this.boardFacade.boards$.pipe(map((boards: IBoard[]) => this.sort(boards)));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public editBoard(board: IBoard): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50vw',
      data: {
        board,
        title: 'board.edit_board',
        action: IBoardModalAction.Update,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((boardModal: IBoardModal) => {
        if (boardModal?.board) {
          const board: IBoard = <IBoard>boardModal.board;
          this.boardFacade.updateBoard(board);
        }
      });
  }

  public deleteBoard(board: IBoard): void {
    const message = this.translate.instant('components.confirmation-board.message');
    const okCallback = (): void => this.boardFacade.deleteBoard(board._id);
    const title = this.translate.instant('components.confirmation-board.title');
    this.notificationService.confirm(message, okCallback, title);
  }

  public navigate(board: IBoard): void {
    this.router.navigate([`board/${board._id}`]);
  }

  public onSearch(value: string): void {
    this.commonFacade.updateSearchValue(value);
  }

  public onSort(value: ISort): void {
    this.commonFacade.updateSortBy(value);
  }

  public toggleList(value: boolean): void {
    this.commonFacade.updateIsList(value);
  }

  private sort(boards: IBoard[]): IBoard[] {
    return [...boards].sort((a, b) => (<string>a._id).localeCompare(<string>b._id, undefined, { numeric: false }));
  }
}
