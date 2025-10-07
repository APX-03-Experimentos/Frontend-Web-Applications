// src/app/administrator/services/assignments-admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment, UpdateAssignmentRequest } from '../model/assignment.entity';
import { TokenService } from '../../shared/services/token.service';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AssignmentsAdminService {
  // serverBaseUrl = http://localhost:8080/api/v1
  private readonly base = `${environment.serverBaseUrl}/assignments`;

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

  findAll(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.base, { headers: this.authHeaders() });
  }

  update(id: number, body: UpdateAssignmentRequest): Observable<Assignment> {
    return this.http.put<Assignment>(`${this.base}/${id}`, body, { headers: this.authHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`, { headers: this.authHeaders() });
  }
}
