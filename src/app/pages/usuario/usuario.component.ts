import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from '../../edit-user-dialog/edit-user-dialog.component';
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {LayoutGeralComponent} from "../../layout-geral/layout-geral.component";
import {MatIconButton} from "@angular/material/button";
import {CreateAddressDialogComponent} from "../../create-address-dialog/create-address-dialog.component";
import {ListAddressDialogComponent} from "../../list-address-dialog/list-address-dialog.component";

interface User {
  id: number;
  name: string;
  email: string;
  login: string;
  role: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  standalone: true,
  imports: [
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatIcon,
    MatCellDef,
    MatCell,
    MatHeaderCellDef,
    MatHeaderCell,
    MatColumnDef,
    MatTable,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    LayoutGeralComponent,
    MatCard,
    MatIconButton
  ],
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'name', 'email', 'login', 'role', 'actions'];

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
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

  private loadUsers(): void {
    const headers = this.createHeaders();
    if (headers) {
      this.getUsers(headers).subscribe(data => {
        console.log(data);
        this.dataSource.data = data;
      });
    }
  }

  private getUsers(headers: HttpHeaders): Observable<User[]> {
    return this.http.get<any[]>('http://localhost:8080/api/users', { headers }).pipe(
      map(users => users.map(user => ({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        login: user?.login,
        role: user?.role
      })))
    );
  }

  private openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '1000px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const headers = this.createHeaders();

        const body = {
          name: result.name,
          login: result.login,
          email: result.email
        };

        this.http.put(`http://localhost:8080/api/users/${user.id}`, body, { headers }).subscribe({
          next: () => {
            this.loadUsers();
            this.showSuccessToast('Usuário editado com sucesso!');
          },
          error: () => {
            this.showErrorToast('Erro ao editar usuário. Por favor, tente novamente mais tarde.');
          }
        });
      }
    });
  }
  private openListAddressDialog(user: User): void {
    const dialogRef = this.dialog.open(ListAddressDialogComponent, {
      width: '1000px',
      data: { user }
    });

  }
  private openCreateAddressDialog(user: User): void {
    const dialogRef = this.dialog.open(CreateAddressDialogComponent, {
      width: '1000px',
      data: { user }
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
          user_id: user.id
        };

        this.http.post(`http://localhost:8080/api/address`, body, { headers }).subscribe({
          next: () => {
            this.loadUsers();
            this.showSuccessToast('Endereço cadastrado com sucesso!');
          },
          error: () => {
            this.showErrorToast('Erro ao cadastrar. Por favor, tente novamente mais tarde.');
          }
        });
      }
    });
  }

  private openConfirmDialog(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza de que deseja excluir este usuário?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const headers = this.createHeaders();

        this.http.delete(`http://localhost:8080/api/users/${user.id}`, { headers }).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
            this.showSuccessToast('Usuário excluído com sucesso!');
          },
          error: () => {
            this.showErrorToast('Erro ao excluir usuário. Por favor, tente novamente mais tarde.');
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

  editarUsuario(user: User): void {
    this.openEditDialog(user);
  }

  excluirUsuario(user: User): void {
    this.openConfirmDialog(user);
  }

  visualizarEnderecos(user: User): void {
    this.openListAddressDialog(user);
  }
  cadastrarEnderecos(user: User): void {
    this.openCreateAddressDialog(user);
  }
}
