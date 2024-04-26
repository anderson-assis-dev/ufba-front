import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

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
    MatDialogClose
  ],
  styleUrls: ['./create-address-dialog.component.scss']
})
export class CreateAddressDialogComponent {
  address: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateAddressDialogComponent>,
    private http: HttpClient
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
