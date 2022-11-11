import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommonFacade } from './core';
import { TranslateNames } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  title = 'project-management-app';

  constructor(private commonFacade: CommonFacade, private translate: TranslateService) {
    this.translate.addLangs([TranslateNames.En, TranslateNames.Ru]);
  }

  public ngOnInit(): void {
    this.subscription = this.commonFacade.language$.subscribe((language) => this.translate.use(language));
    this.commonFacade.loadLanguage();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
