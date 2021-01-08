export class QuizTaker {
  id: number;
  constructor(
    public score: number,
    public start_time: Date,
    public end_time: Date,
    public associated_student: number,
    public associated_quiz: number
  ) {}
}
