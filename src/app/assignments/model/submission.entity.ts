export class Submission {
  id: number;
  assignmentId: number;
  studentId: number;
  content: string;
  score: number;
  imageUrl: string;
  status: string;
  fileUrls: string[];

  constructor(submission: {id: number, assignmentId: number, studentId: number, content: string, score: number, imageUrl: string, status: string}) {
    this.id = submission.id;
    this.assignmentId = submission.assignmentId;
    this.studentId = submission.studentId;
    this.content = submission.content;
    this.score = submission.score;
    this.imageUrl = submission.imageUrl;
    this.status = submission.status;
    this.fileUrls = [];
  }
}
