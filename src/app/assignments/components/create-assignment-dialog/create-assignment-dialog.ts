import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {Assignment} from '../../model/assignment.entity';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {AssignmentsService} from '../../services/assignments.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-assignment-dialog',
  imports: [
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDialogActions,
    MatButton,
    MatInput,
    MatLabel
  ],
  templateUrl: './create-assignment-dialog.html',
  standalone: true,
  styleUrl: './create-assignment-dialog.css'
})
export class CreateAssignmentDialog {


  title: string = '';
  description: string = '';
  deadline: Date = new Date();


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {courseId: number},
    public dialogRef: MatDialogRef<CreateAssignmentDialog>,
    private assignmentService: AssignmentsService,
    private loadingService: LoadingService,
  ) {}

  OnSave(): void {
    this.loadingService.startLoadingDialog()
    this.assignmentService.CreateAssignment({
      title: this.title,
      description: this.description,
      courseId: this.data.courseId,
      deadline: this.deadline.toISOString(),
      imageUrl: ""
    }).subscribe({
      next: () => {
        this.assignmentService.EmitUpdate()
      },
      error: (err) => {
        console.log(err)
        this.loadingService.stopLoadingDialog()
        this.dialogRef.close();
      },
      complete: () => {
        this.loadingService.stopLoadingDialog()
        this.dialogRef.close();
      }
    })
  }
}
