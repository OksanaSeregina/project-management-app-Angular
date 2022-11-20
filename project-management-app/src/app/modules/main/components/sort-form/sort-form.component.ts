import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonFacade } from '../../../../core';
import { take } from 'rxjs/operators';
import { ISort } from './models';

@Component({
  selector: 'app-sort-form',
  templateUrl: './sort-form.component.html',
  styleUrls: ['./sort-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortFormComponent implements OnInit {
  public isAsc: boolean;
  public isDesc: boolean;

  @Output() public sort = new EventEmitter<ISort>();

  constructor(private commonFacade: CommonFacade) {}

  public ngOnInit(): void {
    this.commonFacade.sortBy$.pipe(take(1)).subscribe(({ isAsc, isDesc }: ISort) => {
      this.isAsc = isAsc;
      this.isDesc = isDesc;
    });
  }

  public sortByAsc(): void {
    this.isAsc = !this.isAsc;
    this.isDesc = false;
    this.sort.emit({ isAsc: this.isAsc, isDesc: this.isDesc });
  }

  public sortByDesc(): void {
    this.isDesc = !this.isDesc;
    this.isAsc = false;
    this.sort.emit({ isAsc: this.isAsc, isDesc: this.isDesc });
  }
}
