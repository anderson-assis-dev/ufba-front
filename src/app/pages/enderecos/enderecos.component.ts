import {Component, Inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EditAddressDialogComponent} from "../../edit-address-dialog/edit-address-dialog.component";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LayoutGeralComponent} from "../../layout-geral/layout-geral.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {CreateAddressDialogComponent} from "../../create-address-dialog/create-address-dialog.component";
import {NgIf} from "@angular/common";
interface Address {
  id: number;
  postalCode: string;
  state: string;
  city: string;
  street: string;
  user_id: number;
}
@Component({
  selector: 'app-enderecos',
  standalone: true,
  imports: [
    LayoutGeralComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    NgIf,
    MatButton
  ],
  templateUrl: './enderecos.component.html',
  styleUrl: './enderecos.component.scss'
})
export class EnderecosComponent {
  constructor(
    private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar,
  ) {}
  // @ts-ignore
  user_id: number = sessionStorage.getItem('id');

  dataSource = new MatTableDataSource<Address>();
  displayedColumns: string[] = ['id', 'postalCode', 'city', 'street', 'state', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadAddress();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
      this.getAddress().subscribe((data: any) => {
        this.dataSource.data = data.content;
      });
    }
  }

  private getAddress(): Observable<Address[]> {
    const headers = this.createHeaders();
    return this.http.get<any>(`http://localhost:8080/api/address/${this.user_id}`, {
      headers
    });
  }

  public deleteAddress(address: Address) {
    this.openConfirmDialog(address);
  }
  private openEditDialog(address: Address): void {
    const dialogRef = this.dialog.open(EditAddressDialogComponent, {
      width: '1000px',
      data: { address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const headers = this.createHeaders();

        const body = {
          city: result.city,
          postalCode: result.postalCode,
          state: result.state,
          street: result.street,
          user_id: result.user_id,
        };

        this.http.put(`http://localhost:8080/api/address/${address.id}`, body, { headers }).subscribe({
          next: () => {
            this.loadAddress();
            this.showSuccessToast('Endereço editado com sucesso!');
          },
          error: () => {
            this.showErrorToast('Erro ao editar Endereço. Por favor, tente novamente mais tarde.');
          }
        });
      }
    });
  }

  public editAddress(address: Address) {
    this.openEditDialog(address);
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

  public createAddress(): void {
    const dialogRef = this.dialog.open(CreateAddressDialogComponent, {
      width: '1000px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const headers = this.createHeaders();
        console.log(result);
        const body = {
          postalCode: result.cep,
          state: result.estado,
          street: result.rua,
          city: result.cidade,
          user_id: this.user_id
        };

        this.http.post(`http://localhost:8080/api/address`, body, { headers }).subscribe({
          next: () => {
            this.loadAddress();
            this.showSuccessToast('Endereço cadastrado com sucesso!');
          },
          error: () => {
            this.showErrorToast('Erro ao cadastrar. Por favor, tente novamente mais tarde.');
          }
        });
      }
    });
  }

  private showErrorToast(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-toast']
    });
  }
}
