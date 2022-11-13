import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IBoard } from '../../../board';

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleListComponent {
  @Input() public value: IBoard;

  @Output() public delete = new EventEmitter<string>();

  public deleteBoard(): void {
    this.delete.emit(this.value.id);
  }
}
