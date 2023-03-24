import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '../interface/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent {
  readonly heroes$: Observable<Hero[]> = this._heroService._getHeroes$;

  constructor(
    @Inject(HeroService) private readonly _heroService: HeroService) {
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this._heroService.addHero({name} as Hero);
  }

  delete(id: number): void {
    this._heroService.deleteHero(id);
  }

  trackBy(index: number): number {
    return index;
  }

}
