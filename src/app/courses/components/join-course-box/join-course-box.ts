import {Component, EventEmitter} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CoursesService} from '../../services/courses.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {FormsModule} from '@angular/forms';
import {join} from '@angular/compiler-cli';

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
    let joinEnded = new EventEmitter();
    this.loadingService.LoadingDialog(joinEnded)
    this.coursesService.JoinCourse(this.key).subscribe({
      next: () => {
        this.coursesService.EmitUpdatedCourses();
        this.key = ""
        joinEnded.emit()
      },
      error: err => {
        console.log(err)
        joinEnded.emit()
      }
    })
  }

}
