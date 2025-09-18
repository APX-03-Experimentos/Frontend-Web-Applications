import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isLoggedIn: boolean = false;

  tokenChanged: EventEmitter<string>;

  constructor() {
    this.tokenChanged = new EventEmitter();
    this.isLoggedIn = localStorage.getItem('auth_token') !== null;
  }

  public setToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.tokenChanged.emit(token);
    this.isLoggedIn = true;
  }

  public resetToken(): void {
    localStorage.removeItem('auth_token');
    this.tokenChanged.emit(undefined);
    this.isLoggedIn = false;
  }

  public getToken(): string {
    return localStorage.getItem('auth_token')?.toString() || 'null';
  }
}
