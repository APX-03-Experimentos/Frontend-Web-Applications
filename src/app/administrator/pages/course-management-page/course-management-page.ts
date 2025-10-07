// src/app/administrator/pages/course-management-page/course-management-page.ts
import {Component} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {CourseListComponent} from '../../components/course-list/course-list';

@Component({
  selector: 'admin-course-management-page',
  standalone: true,
  imports: [CourseListComponent, RouterModule],
  templateUrl: './course-management-page.html',
  styleUrl: './course-management-page.css'
})
export class CourseManagementPage {}
