// File: src/app/administrator/components/user-item/user-item.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.entity';

@Component({
  selector: 'app-admin-user-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-item.html',
  styleUrls: ['./user-item.css']
})
export class UserItemComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
  @Output() remove = new EventEmitter<User>();
}
