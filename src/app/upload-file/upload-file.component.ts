import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {NgxFileDropEntry, FileSystemFileEntry, NgxFileDropModule} from "ngx-file-drop";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FilesService} from "../service/files.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  standalone: true,
    imports: [
        MatCardContent,
        MatDialogActions,
        MatDialogClose,
        MatCard,
        NgIf,
        MatDialogContent,
        NgxFileDropModule,
        NgForOf,
        MatIcon,
        MatIconButton,
        MatButton,
        MatTooltip
    ],
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  public files: NgxFileDropEntry[] = [];
  public previews: { url: string, type: string }[] = [];
  formData: FormData = new FormData();
  constructor(
    public dialogRef: MatDialogRef<UploadFileComponent>,
    private fileService: FilesService

  ) { }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.previews = []; // Clear previous previews
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const url = e.target.result;
            const type = file.type.startsWith('image/') ? 'image' :
              file.type === 'application/pdf' ? 'pdf' : 'other';
            this.previews.push({ url, type });
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }
  public async uploadFiles() {
    for (const file of this.files) {
      if (file.fileEntry.isFile) {
        const fileEntry = file.fileEntry as FileSystemFileEntry;
        fileEntry.file((f: File) => {
          this.formData.append('files', f);
        });
      }
    }
    this.dialogRef.close( this.formData );
  }

  public removeFile(index: number) {
    this.files.splice(index, 1);
    this.previews.splice(index, 1);
  }
  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  close() {
    this.dialogRef.close();
  }
}
