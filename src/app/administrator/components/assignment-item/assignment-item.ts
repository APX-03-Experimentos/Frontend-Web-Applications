// `src/app/administrator/components/assignment-item/assignment-item.ts`
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Assignment, UpdateAssignmentRequest } from '../../model/assignment.entity';

type EditableAssignmentFields = Omit<UpdateAssignmentRequest, 'deadline' | 'courseId'>;

@Component({
  selector: 'admin-assignment-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignment-item.html',
  styleUrls: ['./assignment-item.css']
})
export class AssignmentItemComponent {
  @Input() assignment!: Assignment;
  @Output() save = new EventEmitter<{ id: number; body: UpdateAssignmentRequest }>();
  @Output() remove = new EventEmitter<number>();

  editing = false;
  errorMessage = '';

  form: EditableAssignmentFields = {
    title: '',
    description: '',
    imageUrl: ''
  };

  startEdit() {
    const a = this.assignment;
    this.form = {
      title: a.title,
      description: a.description,
      imageUrl: a.imageUrl
    };
    this.errorMessage = '';
    this.editing = true;
  }

  cancel() {
    this.editing = false;
    this.errorMessage = '';
  }

  submit() {
    const body: UpdateAssignmentRequest = {
      ...this.form,
      courseId: this.assignment.courseId, // se mantiene
      deadline: this.assignment.deadline  // se mantiene
    };
    this.save.emit({ id: this.assignment.id, body });
    this.editing = false;
  }

  setError(msg: string) {
    this.errorMessage = msg;
  }

  formatDeadline(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString();
  }
}
