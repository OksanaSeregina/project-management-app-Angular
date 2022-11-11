import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateNames } from './enums/translate.enums';
import { StorageService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  constructor(private translate: TranslateService, private storage: StorageService) {}

  public ngOnInit(): void {
    this.translate.addLangs([TranslateNames.En, TranslateNames.Ru]);

    const langLocalStorage = this.storage.get('lang');
    if (!langLocalStorage) {
      const langBrowser = this.translate.getBrowserLang();
      const defaultLang = langBrowser.match(/en|ru/) ? <TranslateNames>langBrowser : TranslateNames.En;
      this.translate.use(defaultLang);
      this.storage.set('lang', defaultLang);
    } else {
      this.translate.use(langLocalStorage);
    }
  }
}
