import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Location} from "@angular/common";

@Component({
  selector: 'app-no-access-page',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './no-access-page.component.html',
  standalone: true,
  styleUrl: './no-access-page.component.css'
})
export class NoAccessPageComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
