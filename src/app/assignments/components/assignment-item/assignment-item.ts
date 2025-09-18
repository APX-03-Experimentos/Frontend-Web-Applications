import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {Assignment} from '../../model/assignment.entity';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-assignment-item',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatButton
  ],
  templateUrl: './assignment-item.html',
  standalone: true,
  styleUrl: './assignment-item.css'
})
export class AssignmentItem {
  @Input() assignment: Assignment | undefined;

  GetFormattedDate(): string {
    if (!this.assignment?.deadline) return '';
    const date = new Date(this.assignment.deadline);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
