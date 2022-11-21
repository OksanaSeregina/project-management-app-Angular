import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { HEADER_BUTTONS } from '../../../../constants';
import { BoardFacade, CommonFacade, IBoard, INavigateButton, UserFacade } from '../../../../core';
import { TranslateNames } from '../../../../enums';
import { BoardModalComponent, IBoardModal, IBoardModalAction } from '../board-modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private commonFacade: CommonFacade,
    private boardFacade: BoardFacade,
    private router: Router,
    private dialog: MatDialog,
    private userFacade: UserFacade,
  ) {}

  public translateNames = TranslateNames;
  public language$: Observable<TranslateNames>;
  public buttons$: Observable<INavigateButton[]>;

  public ngOnInit(): void {
    this.language$ = this.commonFacade.language$;
    this.buttons$ = this.userFacade.user$.pipe(
      map((user) => HEADER_BUTTONS.filter((button) => button.isVisibleForUser === !!user)),
    );
  }

  public languageChange(language: MatButtonToggleChange): void {
    this.commonFacade.updateLanguage(language.value);
  }

  public navigateToRoute(value: INavigateButton): void {
    const route = value.route;
    if (route) {
      this.router.navigate([route]);
    } else {
      switch (value.value) {
        case 'header.newboard':
          this.router.navigate(['main']);
          this.openDialog();
          break;
        case 'header.logout':
          this.userFacade.logoutUser();
      }
    }
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(BoardModalComponent, {
      width: '50vw',
      data: {
        title: 'board.add_board',
        action: IBoardModalAction.Create,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((boardModal: IBoardModal) => {
        if (boardModal?.board) {
          const board: Pick<IBoard, 'title'> = boardModal.board;
          this.boardFacade.createBoard(board);
        }
      });
  }
}
