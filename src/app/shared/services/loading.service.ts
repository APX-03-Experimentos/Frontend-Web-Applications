import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoadingDialog} from '../components/loading-dialog/loading-dialog';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  dialogRef: MatDialogRef<LoadingDialog> | undefined;

  constructor(private dialog: MatDialog) { }

  startLoadingDialog(): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(LoadingDialog, {
        hasBackdrop: true,
        disableClose: true,
        enterAnimationDuration: '20ms',
      })
    }
  }

  stopLoadingDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
