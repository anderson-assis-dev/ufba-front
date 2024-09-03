import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatGridList} from "@angular/material/grid-list";
import {AddressService} from "../service/address.service";
import {MatTooltip} from "@angular/material/tooltip";
@Component({
  selector: 'app-create-address-dialog',
  templateUrl: './create-address-dialog.component.html',
  standalone: true,
    imports: [
        MatFormField,
        FormsModule,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatInput,
        MatButton,
        MatDialogClose,
        MatCard,
        MatCardContent,
        MatIcon,
        MatLabel,
        MatIcon,
        MatHint,
        MatGridList,
        MatTooltip
    ],
  styleUrls: ['./create-address-dialog.component.scss']
})
export class CreateAddressDialogComponent {
  address: any = {};
  @ViewChild('map') mapElement: ElementRef | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateAddressDialogComponent>,
    private http: HttpClient,
    private addressService: AddressService
  ) {}

  fillAddress() {
    const cep = this.address.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      return;
    }
    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
      .subscribe(
        data => {
          this.address.rua = data.logradouro;
          this.address.cidade = data.localidade;
          this.address.estado = data.uf;
          this.addressService.showMap(data.localidade, data.uf, this.mapElement);
        },
        error => {
          console.log('Erro ao consultar o CEP', error);
        }
      );
  }
  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close( this.address );
  }
}
