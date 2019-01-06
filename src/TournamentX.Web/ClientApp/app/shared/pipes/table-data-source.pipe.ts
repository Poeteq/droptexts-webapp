import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Pipe({
    name: 'tableDataSource'
})
export class TableDataSourcePipe implements PipeTransform
{
    transform(data: any[]): any
    {
           return data ? new MatTableDataSource(data) : null;
    }
}