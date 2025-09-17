import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {NgOptimizedImage} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navigator',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    NgOptimizedImage,
    RouterOutlet,
    MatSidenavContent,
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './navigator.html',
  standalone: true,
  styleUrl: './navigator.css'
})
export class Navigator {

}
