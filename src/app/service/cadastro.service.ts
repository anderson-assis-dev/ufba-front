import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CadastroResponseType} from "../types/cadastro-response.type";

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) {}
  cadastro(body: any) {
    return this.http.post<CadastroResponseType>("http://localhost:8080/api/users",body);
  }
}
