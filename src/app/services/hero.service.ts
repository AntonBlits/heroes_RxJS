import { Inject, Injectable } from '@angular/core';
import { finalize, Observable, of, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Hero } from '../interface/hero';
import { HeroApi } from '../api/hero.api';
import { DestroyedService } from '../cdk/services/destroyed.service';
import { ProgressService } from '../cdk/services/progress.service';
import { SnackbarService } from '../cdk/services/snackbar.service';


@Injectable({providedIn: 'root'})
export class HeroService {
  private readonly _heroes$ = new Subject<void>();
  readonly _getHeroes$ = this._heroes$.pipe(
    startWith(''),
    tap(() => this._progress.start()),
    switchMap(() =>
      this._heroApi.getHeroes().pipe(
        tap(() => this._snackbar.open('fetched heroes')),
        finalize(() => this._progress.stop()),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
    )
  );

  constructor(
    @Inject(HeroApi) private readonly _heroApi: HeroApi,
    @Inject(DestroyedService) private readonly _destroyed$: Observable<void>,
    @Inject(ProgressService) private readonly _progress: ProgressService,
    @Inject(SnackbarService) private readonly _snackbar: SnackbarService,
  ) {}

  getHero(id: number): Observable<Hero> {
    this._progress.start();
    return this._heroApi.getHero(id).pipe(
      tap(() => this._snackbar.open(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`)),
      finalize(() => this._progress.stop()),
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this._heroApi.searchHeroes(term).pipe(
      tap(x => x.length ?
        this._snackbar.open(`found heroes matching "${term}"`) :
        this._snackbar.open(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  addHero(hero: Hero): void {
    this._progress.start();
    this._heroApi.addHero(hero).pipe(
      tap((newHero: Hero) => {
        this._snackbar.open(`added hero id=${newHero.id}`);
        this._heroes$.next();
      }),
      takeUntil(this._destroyed$),
      finalize(() => this._progress.stop()),
    ).subscribe();
  }

  deleteHero(id: number): void {
    this._progress.start();
    this._heroApi.deleteHero(id).pipe(
      tap(() => {
        this._snackbar.open(`deleted hero id=${id}`);
        this._heroes$.next();
      }),
      takeUntil(this._destroyed$),
      finalize(() => this._progress.stop()),
    ).subscribe();
  }

  updateHero(hero: Hero): void {
    this._progress.start();
    this._heroApi.updateHero(hero).pipe(
      tap(() => {
        this._snackbar.open(`updated hero id=${hero.id}`);
        this._heroes$.next();
      }),
      catchError(this.handleError<Hero>('updateHero')),
      takeUntil(this._destroyed$),
      finalize(() => this._progress.stop()),
    ).subscribe();
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this._snackbar.open(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
