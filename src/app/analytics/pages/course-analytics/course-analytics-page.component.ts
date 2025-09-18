import {Component, EventEmitter, OnInit} from '@angular/core';
import { CoursesService } from '../../../courses/services/courses.service';
import { AuthService } from '../../../iam/services/auth.service';
import { AssignmentsService } from '../../../assignments/services/assignments.service';
import { SubmissionsService } from '../../../assignments/services/submissions.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../shared/services/loading.service';
import { Course } from '../../../courses/model/course.entity';
import { User } from '../../../iam/model/user.entity';
import { Assignment } from '../../../assignments/model/assignment.entity';
import { Submission } from '../../../assignments/model/submission.entity';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-analytics',
  templateUrl: './course-analytics-page.component.html',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  styleUrl: './course-analytics-page.component.css'
})
export class CourseAnalyticsPage implements OnInit {
  courseId: number | undefined;
  course: Course | undefined;
  students: User[] = [];
  assignments: Assignment[] = [];
  submissions: Submission[] = [];

  // Datos para gráficos
  assignmentSubmissionRate: number[] = [];
  averageScores: number[] = [];
  gradedCount = 0;
  notGradedCount = 0;

  // Gráfico de barras: Tasas de entrega por asignación
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Asignaciones'
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Porcentaje de entregas'
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Entregas: ${context.raw}%`;
          }
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Porcentaje de entregas',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  // Gráfico de radar: Rendimiento promedio por asignación
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 20,
        ticks: {
          stepSize: 5
        }
      }
    }
  };

  public radarChartLabels: string[] = [];
  public radarChartType: ChartType = 'radar';
  public radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Calificación promedio',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };

  // Gráfico de dona: Estado de calificaciones
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Calificadas', 'Sin calificar'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 159, 64, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1
      }
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService,
    private assignmentsService: AssignmentsService,
    private submissionsService: SubmissionsService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      const courseIdParam = params.get('courseId');
      if (courseIdParam) {
        this.courseId = +courseIdParam;
      }
    });
  }

  ngOnInit() {
    this.FetchCourseInfo();
    this.FetchStudents();
    this.FetchAssignments();
    this.FetchSubmissions();
  }

  // Tus métodos Fetch existentes (sin cambios)...
  FetchCourseInfo(): void {
    let fetchEnded = new EventEmitter();
    this.loadingService.LoadingDialog(fetchEnded);
    this.coursesService.getById(this.courseId).subscribe({
      next: result => {
        this.course = result;
      },
      error: err => {
        console.log(err);
        fetchEnded.emit()
      },
      complete: () => {
        fetchEnded.emit()
      }
    })
  }

  FetchStudents(): void {
    let fetchEnded = new EventEmitter();
    this.loadingService.LoadingDialog(fetchEnded);
    this.authService.GetStudentsFromCourse(this.courseId).subscribe({
      next: data => {
        this.students = data;
      },
      error: err => {
        console.log(err);
        fetchEnded.emit()
      },
      complete: () => {
        fetchEnded.emit()
      }
    })
  }

  FetchAssignments(): void {
    let fetchEnded = new EventEmitter();
    this.loadingService.LoadingDialog(fetchEnded);
    this.assignmentsService.GetAssignmentsByCourseId(this.courseId).subscribe({
      next: data => {
        this.assignments = data;
        this.prepareChartData();
      },
      error: err => {
        console.log(err);
        fetchEnded.emit()
      },
      complete: () => {
        fetchEnded.emit()
      }
    })
  }

  FetchSubmissions(): void {
    let fetchEnded = new EventEmitter();
    this.loadingService.LoadingDialog(fetchEnded);
    this.submissionsService.GetSubmissionsByCourseId(this.courseId).subscribe({
      next: data => {
        this.submissions = data;
        this.prepareChartData();
      },
      error: err => {
        console.log(err);
        fetchEnded.emit()
      },
      complete: () => {
        fetchEnded.emit()
      }
    })
  }

  // Preparar datos para los gráficos
  prepareChartData(): void {
    if (this.assignments.length === 0 || this.submissions.length === 0 || this.students.length === 0) {
      return;
    }

    // Preparar datos para el gráfico de barras (porcentaje de entregas por asignación)
    this.barChartData.labels = this.assignments.map(a => a.title);
    this.assignmentSubmissionRate = this.assignments.map(assignment => {
      const assignmentSubmissions = this.submissions.filter(s => s.assignmentId === assignment.id);
      const submissionRate = (assignmentSubmissions.length / this.students.length) * 100;
      return Math.round(submissionRate);
    });
    this.barChartData.datasets[0].data = this.assignmentSubmissionRate;

    // Preparar datos para el gráfico de radar (calificación promedio por asignación)
    this.radarChartData.labels = this.assignments.map(a => a.title);
    this.averageScores = this.assignments.map(assignment => {
      const gradedSubmissions = this.submissions.filter(s =>
        s.assignmentId === assignment.id && s.status === 'GRADED'
      );

      if (gradedSubmissions.length === 0) return 0;

      const totalScore = gradedSubmissions.reduce((sum, submission) => sum + submission.score, 0);
      return Math.round((totalScore / gradedSubmissions.length) * 10) / 10; // Redondear a 1 decimal
    });
    this.radarChartData.datasets[0].data = this.averageScores;

    // Preparar datos para el gráfico de dona (estado de calificaciones)
    this.gradedCount = this.submissions.filter(s => s.status === 'GRADED').length;
    this.notGradedCount = this.submissions.filter(s => s.status === 'NOT GRADED').length;
    this.doughnutChartData.datasets[0].data = [this.gradedCount, this.notGradedCount];
  }

  // Eventos para los gráficos (opcional)
  chartClicked({ event, active }: { event?: ChartEvent, active?: object[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event?: ChartEvent, active?: object[] }): void {
    console.log(event, active);
  }

  // Calcular el promedio general de todas las asignaciones
  calculateOverallAverage(): string {
    if (this.averageScores.length === 0) return 'N/A';

    const validScores = this.averageScores.filter(score => score > 0);
    if (validScores.length === 0) return 'N/A';

    const total = validScores.reduce((sum, score) => sum + score, 0);
    const average = total / validScores.length;
    return average.toFixed(1);
  }

// Obtener el número de entregas para una asignación específica
  getSubmissionCount(assignmentId: number): number {
    return this.submissions.filter(s => s.assignmentId === assignmentId).length;
  }
}
