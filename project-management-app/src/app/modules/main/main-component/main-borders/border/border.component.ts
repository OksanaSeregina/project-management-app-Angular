import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Border } from '../../../models/models';
import { TranslateService } from '../../../services/translate.service';

import * as UserAction from '../../../state/actions';

@Component({
  selector: 'app-border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.scss'],
})
export class BorderComponent implements OnInit {
  @Input() border!: Border;
  translate!: boolean;

  constructor(private translateService: TranslateService, private store: Store) {}

  ngOnInit(): void {
    this.translateService.initTranslate$.subscribe((res) => (this.translate = res));
  }

  onDelete(): void {
    const titleBorder: string = this.border.title;
    this.store.dispatch(UserAction.removeBorder({ titleBorder }));
  }
}
