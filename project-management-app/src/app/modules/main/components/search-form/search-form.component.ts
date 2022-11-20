import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { CommonFacade } from '../../../../core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit {
  @Output() public search = new EventEmitter<string>();

  public value: string;

  constructor(private commonFacade: CommonFacade) {}

  public ngOnInit() {
    this.commonFacade.searchValue$.pipe(take(1)).subscribe((value: string) => (this.value = value));
  }

  public onSubmit(): void {
    this.search.emit(this.value);
  }
}
