import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {LoginBox} from '../../components/login-box/login-box';

@Component({
  selector: 'app-auth-page',
  imports: [
    NgOptimizedImage,
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    LoginBox
  ],
  templateUrl: './auth-page.html',
  standalone: true,
  styleUrl: './auth-page.css'
})
export class AuthPage {
  authType: string = "login";
}
