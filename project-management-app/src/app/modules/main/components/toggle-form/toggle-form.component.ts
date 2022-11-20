import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { CommonFacade } from '../../../../core';

@Component({
  selector: 'app-toggle-form',
  templateUrl: './toggle-form.component.html',
  styleUrls: ['./toggle-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleFormComponent implements OnInit {
  public isList: boolean;

  @Output() public isListView = new EventEmitter<boolean>();

  constructor(private commonFacade: CommonFacade) {}

  public ngOnInit(): void {
    this.commonFacade.isList$.pipe(take(1)).subscribe((isList) => (this.isList = isList));
  }

  public toggleView(): void {
    this.isList = !this.isList;
    this.isListView.emit(this.isList);
  }
}
