import {Component, EventEmitter} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {NgOptimizedImage, Location} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TokenService} from '../../../shared/services/token.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {LoadingService} from '../../../shared/services/loading.service';
import {AuthService} from '../../../iam/services/auth.service';

@Component({
  selector: 'app-navigator',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    NgOptimizedImage,
    MatSidenavContent,
    MatToolbar,
    MatIcon,
    MatIconButton,
    RouterOutlet,
    MatButton,
    RouterLink
  ],
  templateUrl: './navigator.html',
  standalone: true,
  styleUrl: './navigator.css'
})
export class Navigator {
  constructor(private tokenService: TokenService,
              private router: Router,
              private loadingService: LoadingService,
              private location: Location,
              private authService: AuthService) {}

  IsUserLoggedIn(): boolean
  {
    return this.tokenService.isLoggedIn;
  }

  LogOut() {
    const stopLoading = new EventEmitter();
    this.loadingService.LoadingDialog(stopLoading)
    this.tokenService.resetToken();
    this.router.navigate(['auth']).then(r => {stopLoading.emit()});
    this.authService.setSignedIn(false);
  }

  GoBack(): void{
    this.location.back()
  }
}
