import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {CadastroComponent} from "./pages/cadastro/cadastro.component";
import {UsuarioComponent} from "./pages/usuario/usuario.component";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "cadastro",
    component: CadastroComponent
  }
  ,
  {
    path: "usuarios",
    component: UsuarioComponent
  }
];
