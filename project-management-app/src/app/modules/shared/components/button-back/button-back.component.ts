import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-back',
  templateUrl: './button-back.component.html',
  styleUrls: ['./button-back.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBackComponent {
  @Input() disabled: boolean = false;

  @Output() public navigate = new EventEmitter();

  public onClick(): void {
    this.navigate.emit();
  }
}
