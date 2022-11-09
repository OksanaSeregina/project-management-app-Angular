import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-main-space',
  templateUrl: './main-space.component.html',
  styleUrls: ['./main-space.component.scss'],
})
export class MainSpaceComponent implements OnInit {
  panelOpenState = false;
  viewInput = false;
  translate!: boolean;

  constructor(private translateService: TranslateService) {}

  titlteFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.translateService.initTranslate$.subscribe((res) => (this.translate = res));
  }
}
