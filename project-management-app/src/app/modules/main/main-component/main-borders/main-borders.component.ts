import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Border } from '../../models/models';
import { TranslateService } from '../../services/translate.service';
import { selectCard } from '../../state/selectors';

@Component({
  selector: 'app-main-borders',
  templateUrl: './main-borders.component.html',
  styleUrls: ['./main-borders.component.scss'],
})
export class MainBordersComponent implements OnInit {
  borders: Border[] = [];
  translate = true;

  constructor(public translateService: TranslateService, private store: Store) {}

  borders$ = this.store.select(selectCard);

  ngOnInit(): void {
    this.translateService.initTranslate$.subscribe((res) => (this.translate = res));

    this.borders$.subscribe((res) => {
      this.borders = res;
    });
  }
}
