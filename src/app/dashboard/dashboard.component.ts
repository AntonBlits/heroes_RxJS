import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { finalize, Observable, pairwise, scan, startWith, Subject, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { Hero } from '../interface/hero';
import { HeroService } from '../services/hero.service';
import { smartSearch } from "../cdk/helpers/smartSearch";
import { ProgressService } from "../cdk/services/progress.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  readonly searchHeroes$ = new Subject<string>();
  value!: string;

  readonly heroes$ = this.searchHeroes$.pipe(
    tap(() => this._progress.start()),
    smartSearch((value: string) =>
      this._heroService.searchHeroes(value).pipe(
        finalize(() => this._progress.stop()),
      ),
       () => this._progress.stop()
    )
  )

  readonly filterValue = (item: Hero, value: string): boolean =>
    item.name.toLowerCase().includes(value?.toLowerCase());

  readonly trackBy = (index: number): number => index;

  constructor(
    @Inject(HeroService) private readonly _heroService: HeroService,
    @Inject(ProgressService) private readonly _progress: ProgressService
  ) {
  }

  search(): void {
    this.searchHeroes$.next(this.value);
  }
}
