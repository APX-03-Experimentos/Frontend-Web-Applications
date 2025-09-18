import { Component } from '@angular/core';
import {CreateCourseBox} from '../../components/create-course-box/create-course-box';

@Component({
  selector: 'app-courses-page',
  imports: [
    CreateCourseBox
  ],
  templateUrl: './courses-page.html',
  standalone: true,
  styleUrl: './courses-page.css'
})
export class CoursesPage {

}
