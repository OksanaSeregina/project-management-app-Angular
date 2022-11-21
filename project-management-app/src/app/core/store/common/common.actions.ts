import { createAction, props } from '@ngrx/store';
import { TranslateNames } from '../../../enums';
import { ISort } from '../../models';

/**
 * Common state actions
 */
export const loadLanguage = createAction('[Common] LOAD_LANGUAGE');
export const loadLanguageSuccess = createAction('[Common] LOAD_LANGUAGE_SUCCESS', props<{ lang: TranslateNames }>());
export const updateLanguage = createAction('[Common] UPDATE_LANGUAGE', props<{ lang: TranslateNames }>());
export const updateLanguageSuccess = createAction(
  '[Common] UPDATE_LANGUAGE_SUCCESS',
  props<{ lang: TranslateNames }>(),
);

export const loadSearchValue = createAction('[Common] LOAD_SEARCH_VALUE');
export const loadSearchValueSuccess = createAction(
  '[Common] LOAD_SEARCH_VALUE_SUCCESS',
  props<{ searchValue: string }>(),
);
export const updateSearchValue = createAction('[Common] UPDATE_SEARCH_VALUE', props<{ searchValue: string }>());
export const updateSearchValueSuccess = createAction(
  '[Common] UPDATE_SEARCH_VALUE_SUCCESS',
  props<{ searchValue: string }>(),
);

export const loadSortBy = createAction('[Common] LOAD_SORT_BY');
export const loadSortBySuccess = createAction('[Common] LOAD_SORT_BY_SUCCESS', props<{ sortBy: ISort }>());
export const updateSortBy = createAction('[Common] UPDATE_SORT_BY', props<{ sortBy: ISort }>());
export const updateSortBySuccess = createAction('[Common] UPDATE_SORT_BY_SUCCESS', props<{ sortBy: ISort }>());

export const loadIsList = createAction('[Common] LOAD_IS_LIST');
export const loadIsListSuccess = createAction('[Common] LOAD_IS_LIST_SUCCESS', props<{ isList: boolean }>());
export const updateIsList = createAction('[Common] UPDATE_IS_LIST', props<{ isList: boolean }>());
export const updateIsListSuccess = createAction('[Common] UPDATE_IS_LIST_SUCCESS', props<{ isList: boolean }>());
