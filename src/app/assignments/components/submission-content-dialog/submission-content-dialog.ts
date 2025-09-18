import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {Submission} from '../../model/submission.entity';

@Component({
  selector: 'app-submission-content-dialog',
  imports: [
    MatDialogContent
  ],
  templateUrl: './submission-content-dialog.html',
  standalone: true,
  styleUrl: './submission-content-dialog.css'
})
export class SubmissionContentDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {submission: Submission},
    private dialogRef: MatDialogRef<SubmissionContentDialog>,
  ) {}

}
