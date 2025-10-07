import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, UpdateCourseRequest } from '../model/course.entity';
import { TokenService } from '../../shared/services/token.service';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CoursesAdminService {
  private readonly base = `${environment.serverBaseUrl}${environment.coursesEndpointPath}`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  private authHeaders(): HttpHeaders | undefined {
    const t = this.tokenService.getToken();
    return t && t !== 'null'
      ? new HttpHeaders({ Authorization: `Bearer ${t}` })
      : undefined;
  }

  findAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.base, {
      headers: this.authHeaders()
    });
  }

  update(courseId: number, body: UpdateCourseRequest): Observable<Course> {
    return this.http.put<Course>(`${this.base}/${courseId}`, body, {
      headers: this.authHeaders()
    });
  }

  delete(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${courseId}`, {
      headers: this.authHeaders()
    });
  }
}
