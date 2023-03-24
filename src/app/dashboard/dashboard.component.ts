import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Hero } from '../interface/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  heroes$!: Observable<Array<Hero>>;
  value!: string

  readonly firstHeroes$ = this._heroService._getHeroes$.pipe(
    map((hero: Hero[]) =>
      hero.filter((hero: Hero, index: number) =>
        index < 4))
  );

  constructor(
    @Inject(HeroService) private readonly _heroService: HeroService) {
  }

  search(): void {
    this.heroes$ = this._heroService.searchHeroes(this.value).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }
}
