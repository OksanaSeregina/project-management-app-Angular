import { createAction, props } from '@ngrx/store';
import { TranslateNames } from '../../../enums';

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
