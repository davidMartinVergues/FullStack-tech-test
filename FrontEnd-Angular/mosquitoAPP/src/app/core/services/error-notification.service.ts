import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificationService {

  constructor(private snackBar: MatSnackBar) { }

  private errorSubject = new Subject<string>();
  public error$ = this.errorSubject.asObservable();

  showError(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-error-snackbar'],
    });
  }
}
