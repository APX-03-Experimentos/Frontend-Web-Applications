import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CoursesService} from '../../services/courses.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-join-course-box',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    FormsModule
  ],
  templateUrl: './join-course-box.html',
  standalone: true,
  styleUrl: './join-course-box.css'
})
export class JoinCourseBox {

  key: string = "";

  constructor(private coursesService:CoursesService, private loadingService: LoadingService) {}

  Join(): void {
    this.loadingService.startLoadingDialog()
    this.coursesService.JoinCourse(this.key).subscribe({
      next: () => {
        this.coursesService.EmitUpdatedCourses();
      },
      error: err => {
        console.log(err)
        this.loadingService.stopLoadingDialog()
      },
      complete: () => {
        this.loadingService.stopLoadingDialog()
      }
    })
  }

}
