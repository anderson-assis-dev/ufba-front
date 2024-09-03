import { Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {LayoutGeralComponent} from "../../layout-geral/layout-geral.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {EditUserDialogComponent} from "../../edit-user-dialog/edit-user-dialog.component";
import {ListAddressDialogComponent} from "../../list-address-dialog/list-address-dialog.component";
import {CreateAddressDialogComponent} from "../../create-address-dialog/create-address-dialog.component";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {AddressService} from "../../service/address.service";
import {UsersService} from "../../service/users.service";
import {MatTooltip} from "@angular/material/tooltip";

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
        MatCardContent,
        MatCardTitle,
        MatCardHeader,
        MatCard,
        LayoutGeralComponent,
        MatTable,
        MatHeaderCell,
        MatColumnDef,
        MatCell,
        MatIcon,
        MatHeaderRow,
        MatPaginator,
        MatRow,
        MatRowDef,
        MatHeaderRowDef,
        MatIconButton,
        MatCellDef,
        MatHeaderCellDef,
        MatButton,
        MatTooltip
    ],
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'name', 'email', 'login', 'role', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private addressService: AddressService,
    private userService: UsersService) {}

  async ngOnInit(): Promise<void> {
    this.dataSource.data = await this.userService.loadUsers()
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '1000px',
      data: { user }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        const data: boolean = await this.userService.editUser(result);
        if (data) {
          this.dataSource.data = await this.userService.loadUsers();
        }
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza de que deseja excluir este usuário?'
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        const data: boolean = await this.userService.deleteUser(user);
        if (data) {
          this.dataSource.data = await this.userService.loadUsers();
        }
      }
    });
  }

  viewAddress(user: User): void {
    const dialogRef = this.dialog.open(ListAddressDialogComponent, {
      width: '1000px',
      data: { user }
    });
  }
  createAddress(user: User): void {
    const dialogRef = this.dialog.open(CreateAddressDialogComponent, {
      width: '1000px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(async result => {

      const data: boolean = this.addressService.createAddress(result, user?.id);
      if (data) {
        this.dataSource.data = await this.userService.loadUsers();
      }
    });
  }
}
