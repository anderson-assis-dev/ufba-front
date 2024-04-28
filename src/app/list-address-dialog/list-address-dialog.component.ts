import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
interface Address {
  id: number;
  postalCode: string;
  state: string;
  city: string;
  street: string;
  user_id: number;
}
@Component({
  selector: 'app-list-address-dialog',
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
    MatIcon,
    MatInput,
    MatLabel,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './list-address-dialog.component.html',
  styleUrl: './list-address-dialog.component.scss'
})
export class ListAddressDialogComponent {
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ListAddressDialogComponent>
  ) {
    this.user = { ...data.user };
  }
  dataSource = new MatTableDataSource<Address>();
  displayedColumns: string[] = ['id', 'postalCode', 'city', 'street', 'state', 'actions'];

  ngOnInit(): void {
    this.loadAddress();
  }

  private getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private loadAddress(): void {
    const headers = this.createHeaders();
    if (headers) {
      this.getAddress(headers).subscribe(data => {
        console.log(data);
        this.dataSource.data = data;
      });
    }
  }
  private getAddress(headers: HttpHeaders): Observable<Address[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/address/${this.user?.id}`, { headers }).pipe(
      map(address => address.map(address => ({
        id: address?.id,
        postalCode: address?.postalCode,
        city: address?.city,
        street: address?.street,
        state: address?.state,
        user_id: address?.user_id,
      })))
    );
  }
  onCancel() {
    this.dialogRef.close(null);

  }

  deleteAddress(address: Address) {
    this.openConfirmDialog(address);
  }

  editAddress(address: any) {

  }
  private openConfirmDialog(address: Address): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza de que deseja excluir este endereço?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const headers = this.createHeaders();

        this.http.delete(`http://localhost:8080/api/address/${address?.id}`, { headers }).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(u => u.id !== address.id);
            this.showSuccessToast('Endereço excluído com sucesso!');
          },
          error: () => {
            this.showErrorToast('Erro ao excluir Endereço. Por favor, tente novamente mais tarde.');
          }
        });
      }
    });
  }
  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-toast']
    });
  }

  private showErrorToast(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-toast']
    });
  }
}
