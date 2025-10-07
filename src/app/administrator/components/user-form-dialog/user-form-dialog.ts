import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { UsersAdminService, SaveUserDto } from '../../services/users-admin.service';
import { User } from '../../model/user.entity';

type UserFormGroup = FormGroup<{
  userName: FormControl<string>;
  password: FormControl<string>;
}>;

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form-dialog.html',
  styleUrls: ['./user-form-dialog.css']
})
export class UserFormDialogComponent implements OnChanges {
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form: UserFormGroup;

  constructor(private fb: FormBuilder, private service: UsersAdminService) {
    this.form = this.fb.nonNullable.group({
      userName: ['', Validators.required],
      password: [''] // requerido sólo al crear
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      if (this.user) {
        this.form.patchValue({ userName: this.user.userName ?? '', password: '' });
      } else {
        this.form.reset({ userName: '', password: '' });
      }
    }
  }

  private buildDto(): SaveUserDto {
    const raw = this.form.getRawValue();
    if (this.user) {
      const dto: SaveUserDto = { id: this.user.id, userName: raw.userName };
      if (raw.password.trim()) dto.password = raw.password.trim(); // incluir solo si se cambia
      return dto;
    }
    return {
      userName: raw.userName,
      password: raw.password.trim() || 'changeme'
    };
  }

  submit(): void {
    if (this.form.invalid) return;
    const dto = this.buildDto();
    this.service.save(dto).subscribe({
      next: () => this.saved.emit(),
      error: err => {
        console.error('Error guardando usuario', err);
        // opcional: mostrar mensaje en UI
      }
    });
  }

  cancel(): void {
    this.close.emit();
  }
}
