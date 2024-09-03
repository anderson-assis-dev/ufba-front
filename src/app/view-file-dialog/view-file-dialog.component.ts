import {Component, Inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-view-file-dialog',
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
        NgxExtendedPdfViewerModule,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        NgOptimizedImage,
        NgIf,
        MatTooltip
    ],
  templateUrl: './view-file-dialog.component.html',
  styleUrl: './view-file-dialog.component.scss'
})
export class ViewFileDialogComponent implements OnInit {
  base64: any = "";
  titleFile: string = "";
  fileBase64: string = "";
  fileType: string = "";
  showPDF: boolean = false;
  showImage: boolean = false;
  pdfDoc: any;
  currentPage: number = 1;
  constructor(
    public dialogRef: MatDialogRef<ViewFileDialogComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  ngOnInit () {
    this.fileBase64 = this.data?.data?.data
    this.detectFileType();
    this.titleFile = this.data?.data?.fileName;
  }
  detectFileType(): void {
    if (this.fileBase64.startsWith('%PDF-')) {
      console.log("true")
    }

    if(this.data?.data?.mimeType != "application/pdf") {
      this.showImage = true;
      this.showPDF = false;
      console.log("true");
      this.base64 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.data?.data?.data}`);
    }
    else{
      console.log("false")
      this.fileType = 'PDF';
      this.showPDF = false;
      this.showImage = false;
      this.convertBase64ToPdf()
      this.close()
    }
  }
  convertBase64ToPdf() {
    const byteCharacters = atob(this.fileBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
    //this.base64 = url;
  }

  close() {
    this.dialogRef.close();
  }
}
