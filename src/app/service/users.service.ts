import { Injectable } from '@angular/core';
import {UtilService} from "./util.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any = [];
  constructor(
    private utilService: UtilService,
    private http: HttpClient
  ) { }
  endpoint: string = "http://localhost:8080/api/users";
  public editUser(data: any): Promise<boolean> {
    const headers = this.utilService.createHeaders();
    const body = {
      name: data.name,
      login: data.login,
      email: data.email
    };

    return new Promise((resolve, reject) => {
      this.http.put(`${this.endpoint}/${data.id}`, body, { headers }).subscribe({
        next: () => {
          this.utilService.showSuccessToast('Usuário editado com sucesso!');
          resolve(true);
        },
        error: (error) => {
          this.utilService.showErrorToast('Erro ao editar usuário. Por favor, tente novamente mais tarde.');
          reject(error);
        }
      });
    });
  }
  public deleteUser(data: any): Promise<boolean> {
    const headers = this.utilService.createHeaders();

    return new Promise((resolve, reject) => {
      this.http.delete(`${this.endpoint}/${data.id}`, { headers }).subscribe({
        next: () => {
          this.utilService.showSuccessToast('Usuário excluído com sucesso!');
          resolve(true);
        },
        error: (error) => {
          this.utilService.showErrorToast('Erro ao excluir usuário. Por favor, tente novamente mais tarde.');
          reject(error);
        }
      });
    });
  }
  public loadUsers(): Promise<any> {
    const headers = this.utilService.createHeaders();

    return new Promise((resolve, reject) => {
      this.http.get<any>(this.endpoint, { headers }).subscribe({
        next: (data) => {
          resolve(data?.content);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }
}
