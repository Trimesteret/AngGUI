import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) { }

  public show(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  public showError(error: HttpErrorResponse): void {
    let message = 'Something went wrong';
    if(error.status !== 0){
      message = error.error;
    }

    this.snackBar.open(message , 'Dismiss', { duration: 5000 });
  }
}
