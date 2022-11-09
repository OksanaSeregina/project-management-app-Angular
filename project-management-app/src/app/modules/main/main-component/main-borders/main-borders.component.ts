import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-main-borders',
  templateUrl: './main-borders.component.html',
  styleUrls: ['./main-borders.component.scss'],
})
export class MainBordersComponent implements OnInit {
  // borders = 10;
  translate = true;

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.initTranslate$.subscribe((res) => (this.translate = res));
  }
}
