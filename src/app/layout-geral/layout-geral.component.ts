import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-layout-geral',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './layout-geral.component.html',
  styleUrl: './layout-geral.component.scss'
})
export class LayoutGeralComponent {
  // @ts-ignore
  role: string | undefined = sessionStorage.getItem('role');
  showItemAdmin: boolean = false;
  showItemUser: boolean = false;

  constructor(private router: Router,   private http: HttpClient,private snackBar: MatSnackBar) {
    if(this.role == "ADMIN"){
      this.showItemAdmin = true;
    }
    else{
      this.showItemUser = true;
    }
  }


  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryButton: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  submit(){
    this.onSubmit.emit();
  }
  public usuarios(){
    this.router.navigate(['usuarios']);

  }
  public enderecos(){
    this.router.navigate(['enderecos']);

  }
  private getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-toast']
    });
  }
  private showErrorToast(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-toast']
    });
  }
  public sair(){
    const headers = this.createHeaders();

    this.http.post(`http://localhost:8080/auth/logout`, { }, {headers}).subscribe({
      next: () => {
        sessionStorage.clear();
        this.showSuccessToast('Logout realizado com sucesso!');
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
      },
      error: () => {
        this.showErrorToast('tente novamente mais tarde.');
      }
    });


  }
  @Output("navigate") onNavigate = new EventEmitter();
  navigate(){
    this.onNavigate.emit();
  }
}
