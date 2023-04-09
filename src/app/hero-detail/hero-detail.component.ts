import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {HeroService} from '../services/hero.service';
import {Hero} from '../interface/hero';
import {filter, shareReplay, switchMap} from 'rxjs';
import {map } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent {
  readonly hero$ = this._activatedRoute.paramMap.pipe(
    map((params: ParamMap) => params.get('id') as string),
    filter(Boolean),
    switchMap((id: string) =>
      this._heroService.getHero(Number(id))),
    shareReplay(1)
  );

  disabled = false;

  constructor(
    @Inject(HeroService) private readonly _heroService: HeroService,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  goBack(): void {
    this.location.back();
  }

  save(hero?: Hero): void {
    this.disabled = true;
    if (hero) {
      this.heroService.updateHero(hero);
      this.disabled = false;
      this.goBack();
    }
  }
}
