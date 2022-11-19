import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { INavigateButton } from '../../../shared';

@Component({
  selector: 'app-button-multicolor',
  templateUrl: './button-multicolor.component.html',
  styleUrls: ['./button-multicolor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonMulticolorComponent {
  @Input() public buttons: INavigateButton[] = [];

  @Output() public navigate = new EventEmitter<INavigateButton>();

  public onClick(value: INavigateButton): void {
    this.navigate.emit(value);
  }
}
