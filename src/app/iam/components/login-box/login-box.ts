// src/app/iam/components/login-box/login-box.ts
import {Component, EventEmitter} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {TokenService} from '../../../shared/services/token.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-box',
  imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    FormsModule
  ],
  templateUrl: './login-box.html',
  standalone: true,
  styleUrl: './login-box.css'
})
export class LoginBox {
  protected username: string = "";
  protected password: string = "";
  protected invalidCredentials: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  LogIn(): void {
    const stopLoading = new EventEmitter();
    this.loadingService.LoadingDialog(stopLoading);
    this.authService.login(this.username, this.password).subscribe({
      next: result => {
        this.tokenService.setToken(result.token);
        this.authService.fetchLoggedUser().subscribe({
          next: (user: any) => {
            const isAdmin = user.roles?.includes('ROLE_ADMIN');
            if (isAdmin) {
              this.router.navigate(['admin/users']);
            } else {
              this.router.navigate(['courses']);
            }
          },
          error: () => stopLoading.emit(),
          complete: () => stopLoading.emit()
        });
        this.authService.setSignedIn(true);
      },
      error: err => {
        console.log(err);
        if (err.status === 500 && this.username !== "" && this.password !== "") {
          this.invalidCredentials = true;
        }
        stopLoading.emit()
      },
      complete: () => {
        stopLoading.emit()
        this.username = "";
        this.password = "";
      }
    });
  }
}
