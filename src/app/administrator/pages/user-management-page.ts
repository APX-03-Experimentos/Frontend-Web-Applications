
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserListComponent } from '../components/user-list/user-list';

@Component({
  selector: 'app-user-management-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, UserListComponent],
  templateUrl: './user-management-page.html',
  styleUrls: ['./user-management-page.css']
})
export class UserManagementPageComponent {}
