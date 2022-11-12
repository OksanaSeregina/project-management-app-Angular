import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateNames } from '../../../enums';
import { AppState } from '../app.state';
import { selectLanguage } from './common.selectors';
import * as CommonActions from './common.actions';

/**
 * Common Facade service
 */
@Injectable()
export class CommonFacade {
  private store: Store<AppState>;

  public language$: Observable<TranslateNames>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.language$ = this.store.pipe(select(selectLanguage));
  }

  public loadLanguage(): void {
    this.store.dispatch(CommonActions.loadLanguage());
  }

  public updateLanguage(lang: TranslateNames): void {
    this.store.dispatch(CommonActions.updateLanguage({ lang }));
  }
}
