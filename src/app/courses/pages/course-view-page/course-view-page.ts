import {Component, OnInit} from '@angular/core';
import {CoursesService} from '../../services/courses.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../../shared/services/token.service';
import {Course} from '../../model/course.entity';
import {LoadingService} from '../../../shared/services/loading.service';
import {AssignmentItem} from '../../../assignments/components/assignment-item/assignment-item';
import {AssignmentList} from '../../../assignments/components/assignment-list/assignment-list';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {
  CreateAssignmentDialog
} from '../../../assignments/components/create-assignment-dialog/create-assignment-dialog';

@Component({
  selector: 'app-course-view-page',
  imports: [
    AssignmentItem,
    AssignmentList,
    MatButton
  ],
  templateUrl: './course-view-page.html',
  standalone: true,
  styleUrl: './course-view-page.css'
})
export class CourseViewPage implements OnInit {

  preCourseId: number | undefined = undefined;

  course: Course | undefined;

  constructor(
    private coursesService: CoursesService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private dialog: MatDialog) {}

  ngOnInit() {
    if (!this.tokenService.isLoggedIn)
    {
      this.router.navigate(["/no-access"])
    }

    const courseIdParam = this.route.snapshot.paramMap.get('courseId');
    if (courseIdParam) {
      this.preCourseId = +courseIdParam;
    }

    this.FetchCourseInfo()
  }

  FetchCourseInfo(): void {
    this.loadingService.startLoadingDialog();
    this.coursesService.getById(this.preCourseId).subscribe({
      next: result => {
        this.course = result;
      }, error: err => {
        console.log(err);
        this.loadingService.stopLoadingDialog()
        this.router.navigate(["/no-access"]);
      },
      complete: () => {
        this.loadingService.stopLoadingDialog()
      }
    })
  }

  OpenCreateDialog(): void {
    this.dialog.open(CreateAssignmentDialog, {
      data: {
        courseId: this.preCourseId,
      },
      hasBackdrop: true,
      disableClose: true
    })
  }

}
