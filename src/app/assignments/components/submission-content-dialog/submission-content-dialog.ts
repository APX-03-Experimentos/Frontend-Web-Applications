import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {Submission} from '../../model/submission.entity';
import {AuthService} from '../../../iam/services/auth.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SubmissionsService} from '../../services/submissions.service';

@Component({
  selector: 'app-submission-content-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    NgIf,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './submission-content-dialog.html',
  standalone: true,
  styleUrl: './submission-content-dialog.css'
})
export class SubmissionContentDialog implements OnInit {

  gradeForm: FormGroup;

  userRole: string = "";

  constructor(
    private fb: FormBuilder,
    private submissionsService: SubmissionsService,
    @Inject(MAT_DIALOG_DATA) public data: {submission: Submission},
    private dialogRef: MatDialogRef<SubmissionContentDialog>,
    private authService: AuthService,
  ) {
    this.gradeForm = this.fb.group({
      grade: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(20)
        ]
      ]
    });
  }

  ngOnInit() {
    this.FetchUserRole()
  }

  FetchUserRole(): void {
    this.authService.fetchLoggedUser().subscribe({
      next: result => {
        this.userRole = result.roles[0]
      },
      error: err => {
        console.log(err);
      }
    })
  }

  submitGrade() {
    if (this.gradeForm.valid) {
      const grade = this.gradeForm.value.grade;
      console.log("Nota enviada:", grade);

      this.submissionsService.GradeSubmission(this.data.submission.id, grade).subscribe({
        next: () => {
          this.submissionsService.EmitUpdate();
        }
      })

      this.dialogRef.close();
    }
  }
}
