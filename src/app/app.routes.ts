import { Routes } from '@angular/router';
import {AuthPage} from './iam/pages/auth-page/auth-page';
import {CoursesPage} from './courses/pages/courses-page/courses-page';
import {NoAccessPageComponent} from './public/pages/no-access-page/no-access-page.component';
import {CourseViewPage} from './courses/pages/course-view-page/course-view-page';
import {AssignmentViewPage} from './assignments/pages/assignment-view-page/assignment-view-page';
import {CourseAnalyticsPage} from './analytics/pages/course-analytics/course-analytics-page.component';
import {CourseMembersPage} from './courses/pages/course-members-page/course-members-page';
import { UserManagementPageComponent } from './administrator/pages/user-management-page';
import { CourseManagementPage } from './administrator/pages/course-management-page/course-management-page';

import { AssignmentManagementPageComponent } from './administrator/pages/assignment-management-page/assignment-management-page';
import {authenticationGuard} from './iam/services/authentication.guard';
export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthPage },
  { path: 'courses', component: CoursesPage, canActivate: [authenticationGuard] },
  { path: 'course/:courseId', component: CourseViewPage, canActivate: [authenticationGuard] },
  { path: 'course/:courseId/members', component: CourseMembersPage, canActivate: [authenticationGuard] },
  { path: 'course/:courseId/analytics', component: CourseAnalyticsPage, canActivate: [authenticationGuard] },
  { path: 'assignment/:assignmentId', component: AssignmentViewPage, canActivate: [authenticationGuard] },

  { path: 'admin/users', component: UserManagementPageComponent, canActivate: [authenticationGuard] },
  { path: 'admin/courses', component: CourseManagementPage, canActivate: [authenticationGuard] },
  { path: 'admin/assignments', component: AssignmentManagementPageComponent, canActivate: [authenticationGuard] },

  { path: 'no-access', component: NoAccessPageComponent },
  { path: '**', redirectTo: '/auth' }
];
