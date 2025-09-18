import { Routes } from '@angular/router';
import {AuthPage} from './iam/pages/auth-page/auth-page';
import {CoursesPage} from './courses/pages/courses-page/courses-page';

export const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  { path: "auth", component: AuthPage },
  { path: "courses", component: CoursesPage }
];
