import {Component, EventEmitter, OnInit} from '@angular/core';
import {TokenService} from '../../../shared/services/token.service';
import {AuthService} from '../../../iam/services/auth.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../iam/model/user.entity';
import {CoursesService} from '../../services/courses.service';
import {Course} from '../../model/course.entity';

@Component({
  selector: 'app-course-members-page',
  imports: [],
  templateUrl: './course-members-page.html',
  standalone: true,
  styleUrl: './course-members-page.css'
})
export class CourseMembersPage implements OnInit {

  preCourseId: number | undefined;

  students: User[] = [];
  studentsFetched = new EventEmitter();

  teacher: User | undefined;
  teacherFetched = new EventEmitter();

  course: Course | undefined;
  courseFetched = new EventEmitter();

  constructor(
    private coursesService: CoursesService,
    private tokenService: TokenService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {

    if (!this.tokenService.isLoggedIn)
    {
      this.router.navigate(["/no-access"])
    }

    const courseIdParam = this.route.snapshot.paramMap.get('courseId');
    if (courseIdParam) {
      this.preCourseId = +courseIdParam;
    }

    this.fetchCourseStudents()
    this.authService.updatedUsers.subscribe({
      next: () => {
        this.fetchCourseStudents()
      }
    })
    this.fetchCourseInfo()
    this.courseFetched.subscribe({
      next: () => {
        this.fetchTeacherInfo()
      }
    })


  }

  fetchCourseStudents() {
    this.loadingService.LoadingDialog(this.studentsFetched)
    this.authService.GetStudentsFromCourse(this.preCourseId).subscribe({
      next: (result) => {
        this.students = result;
        this.studentsFetched.emit();
      },
      error: err => {
        console.log(err);
        this.studentsFetched.emit();
      }
    })
  }

  fetchCourseInfo() {
    this.loadingService.LoadingDialog(this.courseFetched)
    this.coursesService.getById(this.preCourseId).subscribe({
      next: (result) => {
        this.course = result;
        this.courseFetched.emit()
      },
      error: (err) => {
        console.log(err);
        this.courseFetched.emit()
      }
    })
  }

  fetchTeacherInfo() {
    this.loadingService.LoadingDialog(this.teacherFetched)
    this.authService.getById(this.course!.teacherId).subscribe({
      next: (result) => {
        this.teacher = result;
        this.teacherFetched.emit()
      },
      error: (err) => {
        console.log(err);
        this.teacherFetched.emit()
      }
    })
  }

  kickStudent(studentId: number) {
    let fetchEnded = new EventEmitter();
    this.loadingService.LoadingDialog(fetchEnded)
    this.coursesService.KickStudentFromCourse(this.preCourseId!, studentId).subscribe({
      next: () => {
        console.log("Kicked student with id: " + studentId)
      },
      error: (err) => {
        console.log(err);
        fetchEnded.emit();
      },
      complete: () => {
        fetchEnded.emit();
        this.authService.updatedUsers.emit()
      }
    })
  }

}
