import { NgModule } from '@angular/core';
import { SearchByTagPipe } from './search-by-tag.pipe';
import { SortByValuePipe } from './sort-by-value.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [TruncatePipe, SearchByTagPipe, SortByValuePipe],
  exports: [TruncatePipe, SearchByTagPipe, SortByValuePipe],
})
export class PipesModule {}
