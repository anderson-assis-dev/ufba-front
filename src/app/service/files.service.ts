import { Injectable } from '@angular/core';
import {UtilService} from "./util.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  endpoint: string = "http://localhost:8080/api/files";

  constructor(
    private utilService: UtilService,
    private http: HttpClient
  ) { }
  public loadFiles(user_id: number): Promise<any> {
    const headers = this.utilService.createHeaders();

    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.endpoint}/user/${user_id}`, { headers }).subscribe({
        next: (data) => {
          console.log(data)
          resolve(data?.content);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }
  public getfile(id: number): Promise<boolean> {
    const headers = this.utilService.createHeaders();


    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpoint}/${id}`, { headers }).subscribe({
        next: () => {
          this.utilService.showSuccessToast('Arquivo editado com sucesso!');
          resolve(true);
        },
        error: (error) => {
          this.utilService.showErrorToast('Erro ao editar Arquivo. Por favor, tente novamente mais tarde.');
          reject(error);
        }
      });
    });
  }
  public deleteFile(id: number): Promise<boolean> {
    const headers = this.utilService.createHeaders();

    return new Promise((resolve, reject) => {
      this.http.delete(`${this.endpoint}/${id}`, { headers }).subscribe({
        next: () => {
          this.utilService.showSuccessToast('Arquivo excluído com sucesso!');
          resolve(true);
        },
        error: (error) => {
          this.utilService.showErrorToast('Erro ao excluir Arquivo. Por favor, tente novamente mais tarde.');
          reject(error);
        }
      });
    });
  }
}
