import { Observable, OperatorFunction } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  scan,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

export function smartSearch<T>(
  getSearchFunction: (search: string) => Observable<readonly T[]>,
  stopProgress: Function
): OperatorFunction<string, readonly T[] | null> {
  return source =>
    source.pipe(
      debounceTime(300),
      scan((previousSearched, current) => {
        return previousSearched !== '' && current.startsWith(previousSearched)
          ? previousSearched
          : current;
      }, ''),
      tap(() => stopProgress()),
      distinctUntilChanged(),
      switchMap(getSearchFunction),
      startWith([]),
    );
}
