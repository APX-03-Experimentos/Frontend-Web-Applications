import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Location} from "@angular/common";
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-no-access-page',
  imports: [
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './no-access-page.component.html',
  standalone: true,
  styleUrl: './no-access-page.component.css'
})
export class NoAccessPageComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/auth']).then(r => {});
  }
}
