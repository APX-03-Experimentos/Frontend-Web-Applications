import {Component, EventEmitter} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../../shared/services/token.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-box',
  imports: [
    MatCardContent,
    MatLabel,
    MatFormField,
    MatCard,
    MatInput,
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    FormsModule
  ],
  templateUrl: './register-box.html',
  standalone: true,
  styleUrl: './register-box.css'
})
export class RegisterBox {

  userType: string = "ROLE_STUDENT";
  username: string = "";
  password: string = "";
  confirmPassword: string = "";

  passwordsMatch = true;

  constructor(private authService: AuthService, private tokenService: TokenService, private loadingService: LoadingService, private router: Router) {}

  private clearForm(): void {
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
    this.passwordsMatch = true;
  }

  SignUp(): void {
    if (this.password === this.confirmPassword) {
      const stopLoading = new EventEmitter();
      this.loadingService.LoadingDialog(stopLoading);
      this.authService.signup(this.username, this.password, this.userType).subscribe({
        next: account => {
          alert("Registro exitoso!")
          this.clearForm();
        },
        error: err => {
          console.error("Error en registro:", err);
          stopLoading.emit()
        },
        complete: () => {
          stopLoading.emit()
        }
      })
    } else {
      this.passwordsMatch = false;
    }
  }

}
