import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CadastroService } from '../../service/cadastro.service';
import { LoginService } from '../../service/login.service';
import {PrimaryInputComponent} from "../../componentes/primary-input/primary-input.component";
import {DefaultLoginLayoutComponent} from "../../componentes/default-login-layout/default-login-layout.component";
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgClass} from "@angular/common";
import {PrimarySelectComponent} from "../../componentes/primary-select/primary-select.component";
@Component({
  selector: 'app-cadastro',
  templateUrl: "./cadastro.component.html",
  standalone: true,
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule,
    DefaultLoginLayoutComponent,
    MatProgressBar,
    NgClass,
    PrimarySelectComponent
  ],
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  cadastroForm!: FormGroup;
  // @ts-ignore
  role: string = undefined;
  constructor(
    private router: Router,
    private cadastroService: CadastroService,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) {
    this.cadastroForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('ADMIN', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.cadastroForm.get('name')?.valueChanges.subscribe((name) => {
      const login = name.toLowerCase().replace(/\s+/g, '.');
      this.cadastroForm.get('login')?.setValue(login);
    });
  }
  submit() {
    this.cadastroService.cadastro(this.cadastroForm.value).subscribe({
      next: () => {
        this.toastrService.success('Cadastro realizado com sucesso!');
        this.autenticarAposCadastro(this.cadastroForm.value.login, this.cadastroForm.value.password);
      },
      error: () => {
        this.toastrService.error('Verifique os dados e tente novamente !');
      }
    });
  }
  private autenticarAposCadastro(login: string, password: string) {
    this.loginService.login(login, password).subscribe({
      next: () => {
        // @ts-ignore
        this.role =  sessionStorage.getItem('role');
        setTimeout(() => {
          if(this.role == "ADMIN"){
            this.router.navigate(['usuarios']);
          }
          else{
            this.router.navigate(['enderecos']);
          }
        }, 2000);
      },
      error: () => {
        this.toastrService.error('Erro ao autenticar após o cadastro.');
      }
    });
  }
  navigate() {
    this.router.navigate(['login']);
  }
  getPasswordStrength(password: string): number {
    return password.length >= 8 ? 100 : (password.length / 8) * 100; //
  }
  calculatePasswordStrength(): number {
    const password = this.cadastroForm.get('password')?.value;
    return this.getPasswordStrength(password);
  }
}
