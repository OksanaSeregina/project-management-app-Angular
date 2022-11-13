import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardFacade } from '../../core';
import { IBoard } from '../board';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public boards$: Observable<IBoard[]>;

  constructor(private boardFacade: BoardFacade) {}

  public ngOnInit(): void {
    this.boardFacade.loadBoards();
    this.boards$ = this.boardFacade.boards$.pipe(map((boards: IBoard[]) => this.sort(boards)));
  }

  public createBoard(): void {
    const board: Omit<IBoard, 'id'> = { description: 'Test', title: 'Demo' }; // TODO: TBD Implement modal
    this.boardFacade.createBoard(board);
  }

  public deleteBoard(id: string): void {
    this.boardFacade.deleteBoard(id);
  }

  private sort(boards: IBoard[]): IBoard[] {
    return [...boards].sort((a, b) => (<string>a.id).localeCompare(<string>b.id, undefined, { numeric: false }));
  }
}
