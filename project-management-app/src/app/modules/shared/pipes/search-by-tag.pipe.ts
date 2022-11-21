import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../../../core';

@Pipe({ name: 'searchByTag' })
export class SearchByTagPipe implements PipeTransform {
  public transform(data: IBoard[], value: string): IBoard[] {
    if (!value) {
      return data;
    }
    return data?.filter((item: IBoard) => item.title.toLowerCase().includes(value));
  }
}
