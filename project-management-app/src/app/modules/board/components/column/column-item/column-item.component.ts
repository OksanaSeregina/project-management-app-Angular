import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumn } from '../../../../../core';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnItemComponent {
  @Input() public value: IColumn;

  @Output() public update = new EventEmitter<IColumn>();
  @Output() public delete = new EventEmitter<IColumn>();

  public updateColumn(): void {
    this.update.emit(this.value);
  }

  public deleteColumn(): void {
    this.delete.emit(this.value);
  }
}
