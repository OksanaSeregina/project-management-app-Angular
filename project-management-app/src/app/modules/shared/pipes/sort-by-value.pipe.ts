import { Pipe, PipeTransform } from '@angular/core';
import { IBoard, ISort } from '../../../core';

@Pipe({ name: 'sortByValue' })
export class SortByValuePipe implements PipeTransform {
  public transform(data: IBoard[], value: ISort): IBoard[] {
    if (!value || (!value.isDesc && !value.isAsc)) {
      return data;
    }
    const { isAsc } = value;
    return isAsc
      ? data.slice().sort((a, b) => a.title.localeCompare(b.title))
      : data.slice().sort((a, b) => b.title.localeCompare(a.title));
  }
}
