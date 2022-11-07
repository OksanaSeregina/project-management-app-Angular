import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateNames } from './enums/translate.enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.addLangs([TranslateNames.en, TranslateNames.ru]);

    const langLocalStorage = localStorage.getItem(TranslateNames.lang);
    if (!langLocalStorage) {
      const langBrowser = this.translate.getBrowserLang();
      const defaultLang = langBrowser.match(/en|ru/) ? langBrowser : TranslateNames.en;
      this.translate.use(defaultLang);
      localStorage.setItem(TranslateNames.lang, defaultLang);
    } else {
      this.translate.use(langLocalStorage);
    }
  }
}
