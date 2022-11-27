import { TranslateNames } from '../../enums';
import { ISort } from './sort.model';

/**
 * LocalStorage interface
 */
export interface IStorage {
  lang: TranslateNames;
  token: string;
  searchValue: string;
  isList: boolean;
  sortBy: ISort;
  searchTask: string;
}
