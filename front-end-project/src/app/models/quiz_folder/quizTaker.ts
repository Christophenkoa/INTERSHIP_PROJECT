export class QuizTaker {
  constructor(
    public userId: number,
    public quizId: number,
    public score: number,
    public completed: boolean,
    public startTime: Date,
    public endTime: Date
  ) {}
}
