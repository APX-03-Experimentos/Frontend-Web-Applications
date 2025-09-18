import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-create-course-box',
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './create-course-box.html',
  standalone: true,
  styleUrl: './create-course-box.css'
})
export class CreateCourseBox {

}
