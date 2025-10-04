export class Assignment {
  id: number;
  title: string;
  description: string;
  courseId: number;
  deadline: string;
  imageUrl: string;
  fileUrls: string[];

  constructor(assignment: {id: number, title: string, description: string, courseId: number ,deadline: string, imageUrl: string}) {
    this.id = assignment.id;
    this.title = assignment.title;
    this.description = assignment.description;
    this.courseId = assignment.courseId;
    this.deadline = assignment.deadline;
    this.imageUrl = assignment.imageUrl;
    this.fileUrls = [];
  }
}
