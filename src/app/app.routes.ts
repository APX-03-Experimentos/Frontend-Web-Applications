import { Routes } from '@angular/router';
import {AuthPage} from './iam/pages/auth-page/auth-page';

export const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  { path: "auth", component: AuthPage }
];
