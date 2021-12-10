import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackbar: MatSnackBar) { }

  showSnackBar(message: string){
    this.snackbar.open(message, 'Close',{
      duration:2000,
      verticalPosition:'top',
      horizontalPosition:'center'
    });
  }
}
