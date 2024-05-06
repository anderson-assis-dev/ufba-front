import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {UtilService} from "./util.service";
import {HttpClient} from "@angular/common/http";
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  @ViewChild('map') mapElement: ElementRef | undefined;
  map: any;
  constructor(
    private utilService: UtilService,
    private http: HttpClient
  ) { }
  endpoint: string = "http://localhost:8080/api/address";
  showMap(city: string, state: string, mapElement: any ) {
    if (!this.mapElement){
      this.mapElement = mapElement
    }
    const geocoder = new google.maps.Geocoder();
    const address = `${city}, ${state}, Brazil`;
    geocoder.geocode({ 'address': address }, (results: { geometry: { location: any; }; }[], status: string) => {
      if (status == 'OK') {
        this.map = new google.maps.Map(this.mapElement?.nativeElement, {
          center: results[0].geometry.location,
          zoom: 10
        });
        new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  createAddress(data: any, user_id : number): any {
    if (data) {
      const headers = this.utilService.createHeaders();
      const body = {
        postalCode: data.cep,
        state: data.estado,
        street: data.rua,
        city: data.cidade,
        user_id: user_id
      };

      this.http.post(this.endpoint, body, { headers }).subscribe({
        next: () => {
          this.utilService.showSuccessToast('Endereço cadastrado com sucesso!');
          return true;
        },
        error: () => {
          this.utilService.showErrorToast('Erro ao cadastrar. Por favor, tente novamente mais tarde.');
          return false;
        }
      });
    }
  }
  public loadAddress(user_id: number): Promise<any> {
    const headers = this.utilService.createHeaders();

    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.endpoint}/${user_id}`, { headers }).subscribe({
        next: (data) => {
          resolve(data?.content);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }
  public editAddress(data: any): Promise<boolean> {
    const headers = this.utilService.createHeaders();
    const body = {
      city: data.city,
      postalCode: data.postalCode,
      state: data.state,
      street: data.street,
      user_id: data.user_id,
    };

    return new Promise((resolve, reject) => {
      this.http.put(`${this.endpoint}/${data.id}`, body, { headers }).subscribe({
        next: () => {
          this.utilService.showSuccessToast('Endereço editado com sucesso!');
          resolve(true);
        },
        error: (error) => {
          this.utilService.showErrorToast('Erro ao editar Endereço. Por favor, tente novamente mais tarde.');
          reject(error);
        }
      });
    });
  }
  public deleteAddress(data: any): Promise<boolean> {
    const headers = this.utilService.createHeaders();

    return new Promise((resolve, reject) => {
      this.http.delete(`${this.endpoint}/${data.id}`, { headers }).subscribe({
        next: () => {
          this.utilService.showSuccessToast('Endereço excluído com sucesso!');
          resolve(true);
        },
        error: (error) => {
          this.utilService.showErrorToast('Erro ao excluir Endereço. Por favor, tente novamente mais tarde.');
          reject(error);
        }
      });
    });
  }
}
