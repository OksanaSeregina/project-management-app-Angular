import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateNames } from '../../../enums';
import { ISort } from '../../models';
import { AppState } from '../app.state';
import * as CommonActions from './common.actions';
import { selectIsList, selectLanguage, selectSearchValue, selectSortBy } from './common.selectors';

/**
 * Common Facade service
 */
@Injectable()
export class CommonFacade {
  private store: Store<AppState>;

  public language$: Observable<TranslateNames>;
  public searchValue$: Observable<string>;
  public sortBy$: Observable<ISort>;
  public isList$: Observable<boolean>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.language$ = this.store.pipe(select(selectLanguage));
    this.searchValue$ = this.store.pipe(select(selectSearchValue));
    this.sortBy$ = this.store.pipe(select(selectSortBy));
    this.isList$ = this.store.pipe(select(selectIsList));
  }

  public loadLanguage(): void {
    this.store.dispatch(CommonActions.loadLanguage());
  }

  public updateLanguage(lang: TranslateNames): void {
    this.store.dispatch(CommonActions.updateLanguage({ lang }));
  }

  public loadSearchValue(): void {
    this.store.dispatch(CommonActions.loadSearchValue());
  }

  public updateSearchValue(searchValue: string): void {
    this.store.dispatch(CommonActions.updateSearchValue({ searchValue }));
  }

  public loadSortBy(): void {
    this.store.dispatch(CommonActions.loadSortBy());
  }

  public updateSortBy(sortBy: ISort): void {
    this.store.dispatch(CommonActions.updateSortBy({ sortBy }));
  }

  public loadIsList(): void {
    this.store.dispatch(CommonActions.loadIsList());
  }

  public updateIsList(isList: boolean): void {
    this.store.dispatch(CommonActions.updateIsList({ isList }));
  }
}
