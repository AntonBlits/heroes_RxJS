import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';
import { Hero } from '../interface/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent {
  private readonly _id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  readonly hero$ = this._heroService.getHero(this._id);

  constructor(
    @Inject(HeroService) private readonly _heroService: HeroService,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    if (hero) {
      this.heroService.updateHero(hero);
      this.goBack();
    }
  }
}
