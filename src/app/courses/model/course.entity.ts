export class Course {
  courseId: number;
  teacherId: number;
  title: string;
  imageUrl: string;
  key: string;

  constructor(course: {courseId: number, teacherId: number, title: string, imageUrl: string, key: string}) {
    this.courseId = course.courseId;
    this.teacherId = course.teacherId;
    this.title = course.title;
    this.imageUrl = course.imageUrl;
    this.key = course.key;
  }
}
