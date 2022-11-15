import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IHeaderButton } from '../header';

@Component({
  selector: 'app-button-multicolor',
  templateUrl: './button-multicolor.component.html',
  styleUrls: ['./button-multicolor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonMulticolorComponent {
  @Input() public buttons: IHeaderButton[] = [];

  @Output() public navigate = new EventEmitter<IHeaderButton>();

  public onClick(value: IHeaderButton): void {
    this.navigate.emit(value);
  }
}
