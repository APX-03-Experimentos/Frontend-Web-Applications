// src/app/administrator/components/course-form-dialog/course-form-dialog.ts
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {UpdateCourseRequest, Course} from '../../model/course.entity';

export interface CourseDialogData {
  course: Course;
}

@Component({
  selector: 'admin-course-form-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './course-form-dialog.html',
  styleUrl: './course-form-dialog.css'
})
export class CourseFormDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseDialogData
  ) {
    this.form = this.fb.group({
      title: [data.course.title, [Validators.required, Validators.maxLength(120)]],
      imageUrl: [data.course.imageUrl, [Validators.required]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    const value: UpdateCourseRequest = this.form.value;
    this.ref.close(value);
  }

  cancel() {
    this.ref.close(null);
  }
}
