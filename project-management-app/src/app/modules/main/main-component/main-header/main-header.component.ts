import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  translateRes = false;

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.initTranslate$.subscribe((res) => (this.translateRes = res));
  }

  onClick() {
    this.translateService.translateByText(!this.translateRes);
    // console.log(this.translateRes)
  }
}
