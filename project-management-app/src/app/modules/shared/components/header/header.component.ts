import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonFacade } from '../../../../core';
import { TranslateNames } from '../../../../enums';
import { HEADER_BUTTONS } from '../../constants';
import { IHeaderButton } from './models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(public translate: TranslateService, private commonFacade: CommonFacade, private router: Router) {}

  public translateNames = TranslateNames;
  public language$: Observable<TranslateNames>;
  public buttons$: Observable<IHeaderButton[]>;

  public ngOnInit(): void {
    this.language$ = this.commonFacade.language$;
    this.buttons$ = of(true).pipe(
      // TODO: Replace mock with auth state value
      map((isAuth) => {
        return HEADER_BUTTONS.filter((button) => button.isVisibleForUser === isAuth);
      }),
    );
  }

  public languageChange(language: MatButtonToggleChange): void {
    this.commonFacade.updateLanguage(language.value);
  }

  public navigateToRoute(value: IHeaderButton): void {
    const route = value.route;
    if (route) {
      this.router.navigate([route]);
    }
  }
}
