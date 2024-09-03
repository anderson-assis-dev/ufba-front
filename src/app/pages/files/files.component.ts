import {Component, OnInit, ViewChild} from '@angular/core';
import {LayoutGeralComponent} from "../../layout-geral/layout-geral.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";

import { MessageService, PrimeNGConfig} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import {MatDialog} from "@angular/material/dialog";
import {FilesService} from "../../service/files.service";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {ListAddressDialogComponent} from "../../list-address-dialog/list-address-dialog.component";
import {CreateAddressDialogComponent} from "../../create-address-dialog/create-address-dialog.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ViewFileDialogComponent} from "../../view-file-dialog/view-file-dialog.component";
import {UploadFileComponent} from "../../upload-file/upload-file.component";
import {FileSystemFileEntry} from "ngx-file-drop";
import {MatTooltip} from "@angular/material/tooltip";
interface File {
  id: number;
  fileName: string;
  data: string;
  userId: number;

}
@Component({
  selector: 'app-files',
  standalone: true,

  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
    imports: [
        FileUploadModule,
        MatCard,
        LayoutGeralComponent,
        ButtonModule,
        BadgeModule,
        ProgressBarModule,
        ToastModule,
        HttpClientModule,
        CommonModule,
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
        MatButton,
        MatTooltip
    ],
  providers: [MessageService]
})
export class FilesComponent implements OnInit {

  dataSource = new MatTableDataSource<File>();
  displayedColumns: string[] = ['id', 'fileName', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private fileService: FilesService

  ) {}
  async ngOnInit(): Promise<void> {
    this.dataSource.data = await this.fileService.loadFiles()
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  deleteFile(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza de que deseja excluir este arquivo?'
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        const data: boolean = await this.fileService.deleteFile(id);
        if (data) {
          this.dataSource.data = await this.fileService.loadFiles();
        }
      }
    });
  }

  viewFile(data: any): void {
    const dialogRef = this.dialog.open(ViewFileDialogComponent, {
      width: '1000px',
      data: { data }
    });
  }



  uploadFiles(data: any | null): void {
    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '1000px',
      data: { data }
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
      if(result){
        const data: boolean = await this.fileService.uploadFile(result);
        if (data) {
          this.dataSource.data = await this.fileService.loadFiles();
        }
      }
    });
  }

}
