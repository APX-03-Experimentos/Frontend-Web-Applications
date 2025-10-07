export interface Assignment {
  id: number;
  title: string;
  description: string;
  courseId: number;
  deadline: string; // ISO
  imageUrl: string;
  fileUrls: string[];
}

export interface UpdateAssignmentRequest {
  title: string;
  description: string;
  courseId: number;
  deadline: string; // ISO
  imageUrl: string;
}
