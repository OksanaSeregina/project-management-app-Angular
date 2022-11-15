import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TranslateNames } from '../../../enums';
import { StorageService } from '../../services';
import * as CommonActions from './common.actions';

/**
 * Common effects
 */
@Injectable()
export class CommonEffects {
  private actions$: Actions;

  public loadLanguage$: Observable<Action>;
  public updateLanguage$: Observable<Action>;

  constructor(actions$: Actions, private translate: TranslateService, private storage: StorageService) {
    this.actions$ = actions$;

    this.loadLanguage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CommonActions.loadLanguage),
        switchMap(() => {
          let lang = this.storage.get('lang') as TranslateNames;
          if (!lang) {
            const browserLang = this.translate.getBrowserLang();
            lang = browserLang.match(/en|ru/) ? <TranslateNames>browserLang : TranslateNames.En;
            this.storage.set('lang', lang);
          }
          return of(CommonActions.loadLanguageSuccess({ lang }));
        }),
      ),
    );

    this.updateLanguage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CommonActions.updateLanguage),
        switchMap(({ lang }) => {
          this.storage.set('lang', lang);
          return of(CommonActions.updateLanguageSuccess({ lang }));
        }),
      ),
    );
  }
}
