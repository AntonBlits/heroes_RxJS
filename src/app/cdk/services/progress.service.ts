import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable().pipe(delay(300));
  }

  start(): void {
    return this._isLoading$.next(true);
  }

  stop(): void {
    return this._isLoading$.next(false);
  }
}
