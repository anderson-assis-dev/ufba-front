import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialog,
  MatDialogClose,

} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
    imports: [
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatDialogClose,
        MatButtonModule,
        MatTooltip
    ],
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
