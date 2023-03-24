import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../../interface/hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Iron Man' },
      { id: 2, name: 'Spider Man' },
      { id: 3, name: 'Dr. Strange' },
      { id: 4, name: 'Tor' },
      { id: 5, name: 'Dr. Nice' },
      { id: 6, name: 'Bombasto' },
      { id: 7, name: 'Celeritas' },
      { id: 8, name: 'Magneta' },
      { id: 9, name: 'RubberMan' },
      { id: 10, name: 'Dynama' },
      { id: 11, name: 'Dr. IQ' },
      { id: 12, name: 'Magma' },
      { id: 13, name: 'Tornado' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
