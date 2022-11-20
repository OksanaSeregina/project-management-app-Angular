import { ISort } from '../../modules/main';
import { TranslateNames } from '../../enums';

/**
 * LocalStorage interface
 */
export interface IStorage {
  lang: TranslateNames;
  token: string;
  searchValue: string;
  isList: boolean;
  sortBy: ISort;
}
