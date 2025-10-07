import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssignmentListComponent } from '../../components/assignment-list/assignment-list';

@Component({
  selector: 'admin-assignment-management-page',
  standalone: true,
  imports: [RouterModule, AssignmentListComponent],
  templateUrl: './assignment-management-page.html',
  styleUrls: ['./assignment-management-page.css']
})
export class AssignmentManagementPageComponent {}
