import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login-box',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './login-box.html',
  standalone: true,
  styleUrl: './login-box.css'
})
export class LoginBox {

}
