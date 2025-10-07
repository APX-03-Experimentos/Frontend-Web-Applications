import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAdminService } from '../../services/users-admin.service';
import { User } from '../../model/user.entity';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserListComponent {
  users = signal<User[]>([]);
  loading = signal(false);

  constructor(private service: UsersAdminService) {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.service.list().subscribe({
      next: data => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  remove(u: User): void {
    if (!confirm('Eliminar usuario?')) return;
    this.service.delete(u.id).subscribe(() => this.load());
  }
}
