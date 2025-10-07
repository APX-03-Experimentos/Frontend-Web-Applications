
export interface Course {
  courseId: number;
  teacherId: number;
  title: string;
  imageUrl: string;
  key: string;
}

export interface UpdateCourseRequest {
  title: string;
  imageUrl: string;
}
