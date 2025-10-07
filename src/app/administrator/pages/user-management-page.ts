// File: src/app/administrator/pages/user-management-page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../components/user-list/user-list'; // <- ruta corregida

@Component({
  selector: 'app-user-management-page',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  templateUrl: './user-management-page.html',
  styleUrls: ['./user-management-page.css']
})
export class UserManagementPageComponent {}
