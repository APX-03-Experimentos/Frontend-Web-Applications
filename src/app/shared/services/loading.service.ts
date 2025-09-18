import {EventEmitter, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoadingDialog} from '../components/loading-dialog/loading-dialog';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  dialogRef: MatDialogRef<LoadingDialog> | undefined;

  constructor(private dialog: MatDialog) { }

  /**
   * @deprecated This method is deprecated, use LoadingDialog() instead
   */
  // Mi primer deprecated :D
  startLoadingDialog(): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(LoadingDialog, {
        hasBackdrop: true,
        disableClose: true,
        enterAnimationDuration: '20ms',
      })
    }
  }

  /**
   * @deprecated This method is deprecated, use LoadingDialog() instead
   */
  stopLoadingDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  LoadingDialog(stopEmitter: EventEmitter<any>): void
  {
    let ref = this.dialog.open(LoadingDialog, {
      hasBackdrop: true,
      disableClose: true,
      enterAnimationDuration: '50ms',
      exitAnimationDuration: '50ms',
    })

    stopEmitter.subscribe(() => {
      ref.close();
      stopEmitter.unsubscribe()
    })
  }
}
