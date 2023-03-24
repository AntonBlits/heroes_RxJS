import {Component, Inject} from '@angular/core';
import {ProgressService} from './cdk/services/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title = 'Tour of Heroes';
  readonly isLoading$ = this._progress.isLoading$;

  constructor(
    @Inject(ProgressService) private readonly _progress: ProgressService
  ) {}
}
