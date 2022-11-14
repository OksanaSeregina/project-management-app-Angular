import { Pipe, PipeTransform } from '@angular/core';
import truncate from 'lodash/truncate';
import isEmpty from 'lodash/isEmpty';

const DEFAULT_LENGTH = 180;

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number = DEFAULT_LENGTH): string {
    if (!isEmpty(value)) {
      return value.length > length ? truncate(value, { length: length + 3, separator: '...' }) : value;
    } else {
      return value;
    }
  }
}
