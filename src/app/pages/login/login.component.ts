import { Component } from '@angular/core';
import {DefaultLoginLayoutComponent} from "../../componentes/default-login-layout/default-login-layout.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PrimaryInputComponent} from "../../componentes/primary-input/primary-input.component";
import {Router, RouterOutlet} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  showSpinner: boolean = false;
  // @ts-ignore
  role: string = undefined;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService,
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })
  }
  submit() {
    this.showSpinner = true;
    this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe({
      next: value => {
        // @ts-ignore
        this.role =  sessionStorage.getItem('role');
        console.log(this.role)
        this.toastrService.success("Login realizado com sucesso!");
        setTimeout(() => {
          if(this.role == "ADMIN"){

            this.router.navigate(['usuarios']);
          }
          else{
            this.router.navigate(['enderecos']);
          }

        }, 2000);
      },
      error: value => {
        this.toastrService.error("Verifique os dados e tente novamente !");
        this.showSpinner = false;
      }
    });
  }
  navigate(){
    this.router.navigate(['cadastro']);
  }

  protected readonly onsubmit = onsubmit;
}
