import {Component, Inject, ViewChild} from '@angular/core';
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
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";
import {EditAddressDialogComponent} from "../edit-address-dialog/edit-address-dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {NgIf} from "@angular/common";
import {AddressService} from "../service/address.service";
import {MatTooltip} from "@angular/material/tooltip";
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
        MatHeaderCellDef,
        MatPaginator,
        NgIf,
        MatTooltip
    ],
  templateUrl: './list-address-dialog.component.html',
  styleUrl: './list-address-dialog.component.scss'
})
export class ListAddressDialogComponent {
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ListAddressDialogComponent>,
    private addressService: AddressService,
  ) {
    this.user = { ...data.user };
  }
  dataSource = new MatTableDataSource<Address>();
  displayedColumns: string[] = ['id', 'postalCode', 'city', 'street', 'state', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngOnInit(): Promise<void> {
    this.dataSource.data = await this.addressService.loadAddress(this.user?.id)
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onCancel() {
    this.dialogRef.close(null);

  }
  public deleteAddress(address: Address) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza de que deseja excluir este endereço?'
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        const data: boolean = await this.addressService.deleteAddress(address);
        if (data) {
          this.dataSource.data = await this.addressService.loadAddress(this.user?.id);
        }
      }
    });
  }
  public editAddress(address: Address) {
    const dialogRef = this.dialog.open(EditAddressDialogComponent, {
      width: '1000px',
      data: { address }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        const data: boolean = await this.addressService.editAddress(result);
        if (data) {
          this.dataSource.data = await this.addressService.loadAddress(this.user?.id);
        }
      }
    });
  }
}
