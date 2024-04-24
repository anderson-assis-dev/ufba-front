import {Component, OnInit} from '@angular/core';
import {DefaultLoginLayoutComponent} from "../../componentes/default-login-layout/default-login-layout.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PrimaryInputComponent} from "../../componentes/primary-input/primary-input.component";
import {Router, RouterOutlet} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CadastroService} from "../../service/cadastro.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [CadastroService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cadastroForm!: FormGroup;
  constructor(
    private router: Router,
    private cadastroService: CadastroService,
    private toastrService: ToastrService,
  ) {
    this.cadastroForm = new FormGroup({
      nome: new FormControl("", [Validators.required]),
      login: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })
  }
  submit(){
    this.cadastroService.cadastro(this.cadastroForm.value).subscribe({
      next: value => {this.toastrService.success("Cadastro realizado com sucesso!")},
      error: value => {this.toastrService.error("Verifique os dados e tente novamente !")}
    })
  }

  navigate(){
    this.router.navigate(['login']);
  }

  protected readonly onsubmit = onsubmit;
}
