import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {CadastroComponent} from "./pages/cadastro/cadastro.component";
import {UsuarioComponent} from "./pages/usuario/usuario.component";
import {EnderecosComponent} from "./pages/enderecos/enderecos.component";
import {FilesComponent} from "./pages/files/files.component";

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
  },
  {
    path: "enderecos",
    component: EnderecosComponent
  },
  {
    path: "arquivos",
    component: FilesComponent
  }
];
