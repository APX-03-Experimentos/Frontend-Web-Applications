import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentsAdminService } from '../../services/assignments-admin.service';
import { Assignment, UpdateAssignmentRequest } from '../../model/assignment.entity';
import { AssignmentItemComponent } from '../assignment-item/assignment-item';

@Component({
  selector: 'admin-assignment-list',
  standalone: true,
  imports: [CommonModule, AssignmentItemComponent],
  templateUrl: './assignment-list.html',
  styleUrls: ['./assignment-list.css']
})
export class AssignmentListComponent implements OnInit {
  loading = false;
  items: Assignment[] = [];
  error = '';

  constructor(private service: AssignmentsAdminService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.service.findAll().subscribe({
      next: data => {
        this.items = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error cargando assignments';
        this.loading = false;
      }
    });
  }

  onSave(ev: { id: number; body: UpdateAssignmentRequest }) {
    this.service.update(ev.id, ev.body).subscribe({
      next: updated => {
        this.items = this.items.map(a => a.id === updated.id ? updated : a);
      }
    });
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe({
      next: () => this.items = this.items.filter(a => a.id !== id)
    });
  }
}
