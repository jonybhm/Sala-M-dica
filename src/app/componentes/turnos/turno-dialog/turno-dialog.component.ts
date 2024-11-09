import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-turno-dialog',
  templateUrl: './turno-dialog.component.html',
  styleUrl: './turno-dialog.component.scss'
})
export class TurnoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TurnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() 
  {
    this.dialogRef.close(true); 
  }
}
