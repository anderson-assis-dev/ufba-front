import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackBar: MatSnackBar) { }

  public getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  public createHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  public showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-toast']
    });
  }

  public showErrorToast(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-toast']
    });
  }
}
