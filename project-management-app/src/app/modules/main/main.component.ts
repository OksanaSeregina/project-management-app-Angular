import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardFacade, NotificationService } from '../../core';
import { IBoard } from '../board';

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
  ) {}

  public ngOnInit(): void {
    this.boardFacade.loadBoards();
    this.boards$ = this.boardFacade.boards$.pipe(map((boards: IBoard[]) => this.sort(boards)));
  }

  public deleteBoard(id: string): void {
    const message = this.translate.instant('components.confirmation-board.message');
    const okCallback = (): void => this.boardFacade.deleteBoard(id);
    const title = this.translate.instant('components.confirmation-board.title');
    this.notificationService.confirm(message, okCallback, title);
  }

  private sort(boards: IBoard[]): IBoard[] {
    return [...boards].sort((a, b) => (<string>a._id).localeCompare(<string>b._id, undefined, { numeric: false }));
  }
}
