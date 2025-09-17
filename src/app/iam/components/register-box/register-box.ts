import { Component } from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';

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

  userType: string = "student";

}
