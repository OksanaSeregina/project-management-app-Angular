import { isLoweredSymbol } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HEADER_BUTTONS } from '../../../../constants';
import { BoardFacade, CommonFacade } from '../../../../core';
import { TranslateNames } from '../../../../enums';
import { IHeaderButton } from './models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private commonFacade: CommonFacade,
    private boardFacade: BoardFacade,
    private router: Router,
  ) {}

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
    } else {
      const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
      switch (value.value) {
        case 'newboard':
          this.boardFacade.createBoard({ description, title: 'Test' }); // TODO: TBD Implement modal
      }
    }
  }
}
