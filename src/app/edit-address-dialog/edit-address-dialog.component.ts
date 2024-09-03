import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AddressService} from "../service/address.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-edit-address-dialog',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatTooltip
    ],
  templateUrl: './edit-address-dialog.component.html',
  styleUrl: './edit-address-dialog.component.scss'
})
export class EditAddressDialogComponent implements OnInit {
  address: any = {};
  @ViewChild('map') mapElement: ElementRef | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditAddressDialogComponent>,
    private http: HttpClient,
    private addressService: AddressService

  ) {
    this.address = { ...data.address };
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.addressService.showMap(this.address.city, this.address.state, this.mapElement);
    }, 2000);
  }

  fillAddress() {
    const cep = this.address.postalCode.replace(/\D/g, '');
    if (cep.length !== 8) {
      return;
    }
    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
      .subscribe(
        data => {
          this.address.street = data.logradouro;
          this.address.city = data.localidade;
          this.address.state = data.uf;
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
