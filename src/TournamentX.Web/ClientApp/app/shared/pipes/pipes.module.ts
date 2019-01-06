import { NgModule } from '@angular/core';

import { FilterPipe } from './filter.pipe';
import { TableDataSourcePipe } from './table-data-source.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
    declarations: [
        FilterPipe,
        TableDataSourcePipe,
        TruncatePipe
    ],
    exports: [
        FilterPipe,
        TableDataSourcePipe,
        TruncatePipe
    ]
})
export class TomPipesModule {}
