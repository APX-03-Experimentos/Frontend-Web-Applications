
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {Course} from '../../model/course.entity';

@Component({
  selector: 'admin-course-item',
  standalone: true,
  imports: [NgOptimizedImage, MatCardModule, MatButtonModule, NgIf],
  templateUrl: './course-item.html',
  styleUrl: './course-item.css'
})
export class CourseItemComponent {
  @Input() course!: Course;
  @Output() edit = new EventEmitter<Course>();

  onEdit() {
    this.edit.emit(this.course);
  }
}
