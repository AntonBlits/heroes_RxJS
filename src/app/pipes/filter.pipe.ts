import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe<T> implements PipeTransform {
  transform(items: Array<T>, filterValue: Function, value: string): T[] {
    return items.filter(item => filterValue(item, value));
  }
}
