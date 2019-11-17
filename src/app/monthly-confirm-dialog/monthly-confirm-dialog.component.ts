import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  content: string;
  confirmed: boolean;
}

@Component({
  selector: 'app-monthly-confirm-dialog',
  templateUrl: './monthly-confirm-dialog.component.html',
})
export class MonthlyConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MonthlyConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
