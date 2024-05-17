import { Injectable } from '@angular/core';
import {UtilService} from "./util.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(
    private utilService: UtilService,
    private http: HttpClient
  ) { }
  endpoint: string = "http://localhost:8080/api/files";
  user_id: string | number | null = this.utilService.getUserId()

  public loadFiles(): Promise<any> {
    const headers = this.utilService.createHeaders();

    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.endpoint}/user/${this.user_id}`, { headers }).subscribe({
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
  uploadFile(data: any): any {
    const headers = this.utilService.createHeaders();

    return new Promise((resolve, reject) => {
      this.http.post(`${this.endpoint}/upload/${this.user_id}`, data, { headers }).subscribe({
        next: () => {
          this.utilService.showSuccessToast('Upload realizado');
          resolve(true);
        },
        error: (error) => {
          this.utilService.showErrorToast('Erro ao submeter arquivo. Por favor, tente novamente mais tarde.');
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
