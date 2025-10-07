// src/app/administrator/components/course-list/course-list.ts
import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {BehaviorSubject, finalize} from 'rxjs';
import {CoursesAdminService} from '../../services/courses-admin.service';
import {Course} from '../../model/course.entity';
import {CourseItemComponent} from '../course-item/course-item';
import {CourseFormDialogComponent} from '../course-form-dialog/course-form-dialog';

@Component({
  selector: 'admin-course-list',
  standalone: true,
  imports: [
    SlicePipe,
    NgForOf,
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    CourseItemComponent,
    MatSnackBarModule
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {

  loading = false;
  private coursesSub = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSub.asObservable();

  constructor(
    private coursesService: CoursesAdminService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.coursesService.findAll()
      .pipe(finalize(()=> this.loading = false))
      .subscribe({
        next: data => this.coursesSub.next(data),
        error: () => this.snack.open('Error cargando cursos', 'Cerrar', {duration: 3000})
      });
  }

  editCourse(course: Course) {
    const ref = this.dialog.open(CourseFormDialogComponent, {
      width: '420px',
      data: {course}
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;
      this.coursesService.update(course.courseId, result).subscribe({
        next: updated => {
          this.coursesSub.next(
            this.coursesSub.value.map(c => c.courseId === updated.courseId ? updated : c)
          );
          this.snack.open('Curso actualizado', 'Ok', {duration: 2500});
        },
        error: () => this.snack.open('Error actualizando', 'Cerrar', {duration: 3000})
      });
    });
  }

  deleteCourse(course: Course) {
    if (!confirm(`¿Eliminar el curso "${course.title}" (ID ${course.courseId})?`)) return;
    this.loading = true;
    this.coursesService.delete(course.courseId)
      .pipe(finalize(()=> this.loading = false))
      .subscribe({
        next: () => {
          this.coursesSub.next(this.coursesSub.value.filter(c => c.courseId !== course.courseId));
          this.snack.open('Curso eliminado', 'Ok', {duration: 2500});
        },
        error: () => this.snack.open('Error eliminando curso', 'Cerrar', {duration: 3000})
      });
  }
}
