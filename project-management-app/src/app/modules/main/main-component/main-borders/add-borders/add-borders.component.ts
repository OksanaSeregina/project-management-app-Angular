import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '../../../services/translate.service';
import { BorderService } from '../../../services/border.service';
import * as UserAction from '../../../state/actions';
import { Border } from '../../../models/models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-borders',
  templateUrl: './add-borders.component.html',
  styleUrls: ['./add-borders.component.scss'],
})
export class AddBordersComponent implements OnInit {
  form!: FormGroup;
  translate!: boolean;

  constructor(private store: Store, private borderservice: BorderService, private translateService: TranslateService) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      discription: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.translateService.initTranslate$.subscribe((res) => (this.translate = res));
  }

  onSubmit(): void {
    const cardBorder: Border = {
      title: this.form.value.title,
      discription: this.form.value.discription,
    };

    this.store.dispatch(UserAction.addBorder({ cardBorder }));
  }
}
