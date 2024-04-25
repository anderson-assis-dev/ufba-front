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
        this.toastrService.success("Login realizado com sucesso!");
        setTimeout(() => {
          this.router.navigate(['usuarios']);
        }, 2000);
      },
      error: value => {
        this.toastrService.error("Verifique os dados e tente novamente !");
        this.showSpinner = false;
      }
    });
  }
  navigate(){
    this.router.navigate(['cadastrar']);
  }

  protected readonly onsubmit = onsubmit;
}
