import { TranslateNames } from '../../../enums';

/**
 * Common state model
 */
export interface CommonState {
  lang: TranslateNames;
}

/**
 * Common state initial setup
 */
export const initialCommonState: CommonState = {
  lang: TranslateNames.En,
};
