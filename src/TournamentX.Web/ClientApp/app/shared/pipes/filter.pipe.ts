import { Pipe, PipeTransform } from '@angular/core';
import { TomUtils } from './../utils/index';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform
{
    transform(mainArr: any[], searchText: string): any
    {
        if (!mainArr) return [];
        return TomUtils.filterArrayByString(mainArr, searchText);
    }
}
