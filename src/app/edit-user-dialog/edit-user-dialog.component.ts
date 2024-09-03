import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose, MatDialogContainer,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,


} from '@angular/material/dialog';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatGridList} from "@angular/material/grid-list";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  standalone: true,
    imports: [
        MatFormField,
        MatButton,
        FormsModule,
        MatDialogContent,
        MatDialogTitle,
        MatInput,
        MatDialogActions,
        MatDialogClose,
        MatIcon,
        MatHint,
        MatLabel,
        MatCard,
        MatCardContent,
        MatGridList,
        MatDialogContainer,
        MatTooltip
    ],
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditUserDialogComponent>
  ) {
    this.user = { ...data.user };
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSave(): void {
    this.dialogRef.close( this.user );
  }
}
