import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumn } from '../../../../../core';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnItemComponent {
  private _value: IColumn;

  public isEditable: boolean = false;
  public title: string = '';

  @Input()
  public set value(column: IColumn) {
    this._value = column;
    this.title = column.title;
  }

  public get value() {
    return this._value;
  }

  @Output() public update = new EventEmitter<IColumn>();
  @Output() public delete = new EventEmitter<IColumn>();
  @Output() public editableState = new EventEmitter<boolean>();

  constructor() {}

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
}
