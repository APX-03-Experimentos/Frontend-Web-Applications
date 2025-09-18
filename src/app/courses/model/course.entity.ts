export class Course {
  courseId: number;
  title: string;
  imageUrl: string;
  key: string;

  constructor(course: {courseId: number, title: string, imageUrl: string, key: string}) {
    this.courseId = course.courseId;
    this.title = course.title;
    this.imageUrl = course.imageUrl;
    this.key = course.key;
  }
}
