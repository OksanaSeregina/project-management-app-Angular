import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { isNil } from 'lodash';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TranslateNames } from '../../../enums';
import { ISort } from '../../models';
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
  public loadSearchValue$: Observable<Action>;
  public updateSearchValue$: Observable<Action>;
  public loadSortBy$: Observable<Action>;
  public updateSortBy$: Observable<Action>;
  public loadIsList$: Observable<Action>;
  public loadIsListSuccess$: Observable<Action>;
  public updateIsList$: Observable<Action>;

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

    this.loadSearchValue$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CommonActions.loadSearchValue),
        switchMap(() => {
          const searchValue = <string>this.storage.get('searchValue') || '';
          return of(CommonActions.loadSearchValueSuccess({ searchValue }));
        }),
      ),
    );

    this.updateSearchValue$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CommonActions.updateSearchValue),
        switchMap(({ searchValue }) => {
          this.storage.set('searchValue', searchValue);
          return of(CommonActions.updateSearchValueSuccess({ searchValue }));
        }),
      ),
    );

    this.loadSortBy$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CommonActions.loadSortBy),
        switchMap(() => {
          const sortBy = <ISort>this.storage.get('sortBy') || { isAsc: false, isDesc: false };
          return of(CommonActions.loadSortBySuccess({ sortBy }));
        }),
      ),
    );

    this.updateSortBy$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CommonActions.updateSortBy),
        switchMap(({ sortBy }) => {
          this.storage.set('sortBy', sortBy);
          return of(CommonActions.updateSortBySuccess({ sortBy }));
        }),
      ),
    );

    this.loadIsList$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CommonActions.loadIsList),
        switchMap(() => {
          const isListExist: boolean = !isNil(this.storage.get('isList'));
          const isList = isListExist ? <boolean>this.storage.get('isList') : true;
          return of(CommonActions.loadIsListSuccess({ isList }));
        }),
      ),
    );

    this.updateIsList$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CommonActions.updateIsList),
        switchMap(({ isList }) => {
          this.storage.set('isList', isList);
          return of(CommonActions.updateIsListSuccess({ isList }));
        }),
      ),
    );
  }
}
