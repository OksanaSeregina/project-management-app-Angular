import { TranslateNames } from '../../../enums';
import { ISort } from '../../models';

/**
 * Common state model
 */
export interface CommonState {
  lang: TranslateNames;
  isList: boolean;
  sortBy: ISort;
  searchValue: string;
}

/**
 * Common state initial setup
 */
export const initialCommonState: CommonState = {
  lang: TranslateNames.En,
  isList: true,
  sortBy: {
    isAsc: false,
    isDesc: false,
  },
  searchValue: '',
};
