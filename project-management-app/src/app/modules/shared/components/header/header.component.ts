import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateNames } from '../../../../enums';
import { StorageService } from '../../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public translate: TranslateService, private storage: StorageService) {}

  public ngOnInit(): void {}

  public onValChange(): void {
    const currentLang = this.storage.get('lang');
    const newLang = currentLang === TranslateNames.En ? TranslateNames.Ru : TranslateNames.En;
    this.translate.use(newLang);
    this.storage.set('lang', newLang);
  }
}
