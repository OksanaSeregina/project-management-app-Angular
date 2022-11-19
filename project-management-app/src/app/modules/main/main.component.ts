import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BoardFacade, NotificationService } from '../../core';
import { IBoard } from '../board';
import { BoardModalComponent, IBoardModal, IBoardModalAction } from '../shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public boards$: Observable<IBoard[]>;

  constructor(
    private boardFacade: BoardFacade,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.boardFacade.loadBoards();
    this.boards$ = this.boardFacade.boards$.pipe(map((boards: IBoard[]) => this.sort(boards)));
  }

  public editBoard(board: IBoard): void {
    const dialogRef = this.dialog.open(BoardModalComponent, {
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
          const board: IBoard = boardModal.board;
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

  private sort(boards: IBoard[]): IBoard[] {
    return [...boards].sort((a, b) => (<string>a._id).localeCompare(<string>b._id, undefined, { numeric: false }));
  }
}
