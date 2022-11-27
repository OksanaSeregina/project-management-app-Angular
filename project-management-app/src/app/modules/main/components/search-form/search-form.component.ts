import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { CommonFacade } from '../../../../core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit {
  @Input() public isFilter: boolean;

  @Output() public search = new EventEmitter<string>();

  public value: string;
  public placeholderText: string;
  public buttonText: string;
  public color: string;

  constructor(private commonFacade: CommonFacade) {}

  public ngOnInit(): void {
    this.commonFacade.searchValue$.pipe(take(1)).subscribe((value: string) => (this.value = value));

    if (this.isFilter) {
      this.placeholderText = 'main.filter_by_placeholder';
      this.buttonText = 'main.filter_by_button';
      this.color = 'transparent';
    } else {
      this.placeholderText = 'main.search_by_placeholder';
      this.buttonText = 'main.search_by_button';
    }
  }

  public onSubmit(): void {
    this.search.emit(this.value);
  }
}
