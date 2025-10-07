import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../model/user.entity';
import { TokenService } from '../../shared/services/token.service';

export interface SaveUserDto {
  id?: number;
  userName: string;
  password?: string;
}

@Injectable({ providedIn: 'root' })
export class UsersAdminService {
  private base = `${environment.serverBaseUrl}${environment.usersEndpointPath}`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private authHeaders(): HttpHeaders | undefined {
    const t = this.tokenService.getToken();
    return t && t !== 'null'
      ? new HttpHeaders({ Authorization: `Bearer ${t}` })
      : undefined;
  }

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.base, { headers: this.authHeaders() });
  }

  save(dto: SaveUserDto): Observable<User> {
    // Backend expone PUT /api/v1/users
    return this.http.put<User>(this.base, dto, { headers: this.authHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`, { headers: this.authHeaders() });
  }
}
