import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Border } from '../../models/models';
import { BorderAddService } from '../../services/border.service';
import { TranslateService } from '../../services/translate.service';
import { selectCard } from '../../state/selectors';

@Component({
  selector: 'app-main-borders',
  templateUrl: './main-borders.component.html',
  styleUrls: ['./main-borders.component.scss'],
})
export class MainBordersComponent implements OnInit {
  borders: Border[] = [];
  @Input() border!: string;
  translate = true;
  addBorder = false;

  constructor(
    public translateService: TranslateService,
    private store: Store,
    private borderAddService: BorderAddService,
  ) {}

  borders$ = this.store.select(selectCard);

  ngOnInit(): void {
    this.translateService.initTranslate$.subscribe((res) => (this.translate = res));

    this.borders$.subscribe((res) => {
      this.borders = res;
    });
  }

  onClick(): void {
    this.borderAddService.addBorder(true);
  }
}
