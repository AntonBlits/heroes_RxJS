import { Inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackbarService {
  private readonly _config: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(@Inject(MatSnackBar) private readonly _snackbar: MatSnackBar) {
    this._config.duration = 2000;
    this._config.horizontalPosition = 'end';
    this._config.verticalPosition = 'top';
  }

  open(
    message: string,
  ): MatSnackBarRef<SimpleSnackBar> {
    return this._snackbar.open(message, void 0, this._config);
  }
}
