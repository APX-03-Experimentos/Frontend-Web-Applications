import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {Course} from '../../model/course.entity';
import {NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-course-item',
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    NgOptimizedImage,
    MatButton
  ],
  templateUrl: './course-item.html',
  standalone: true,
  styleUrl: './course-item.css'
})
export class CourseItem {
  @Input() course: Course | undefined;
}
