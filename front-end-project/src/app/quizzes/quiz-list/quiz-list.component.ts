import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../services/quizz/quiz.service';
import {Router} from '@angular/router';
import {StudentsService} from '../../services/student/students.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  public quiz: any[] = [];
  isStaff: string;
  isSuperuser: string;
  id: string;

  constructor(private quizService: QuizService, private router: Router, private studentService: StudentsService) { }

  ngOnInit() {
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.id = localStorage.getItem('id');
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getQuiz()
      .subscribe(
        (data) => {
          console.log(data);

          // if you are a superuser
          if (this.isSuperuser === 'true') {
            this.quiz = data;

            // if you are a teacher
          } else if (this.isStaff === 'true') {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
              if (this.id === data[i].teacher.id.toString()) {
                console.log(data[i]);
                this.quiz.push(data[i]);
              }
            }

            // if you are a student
          } else {
            let studentClassId = -1;
            this.studentService.GetSpecificStudent(+ this.id).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              (user) => {
                studentClassId = user.student_class.id;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                  if (studentClassId === data[i].classe.id) {
                    console.log(data[i]);
                    this.quiz.push(data[i]);
                    console.log(this.quiz);
                  }
                }
                },
              error => {console.log(error); }
            );
          }
        },
        (error ) => {
          console.log(error);
        });
  }

  participate(quizId: number) {
    // tslint:disable-next-line:radix
    const studentId = parseInt(localStorage.getItem('id'));
    this.setQuizTaker(0, studentId, quizId);
  }

  setQuizTaker(score: number, studentId: number, quizId: number) {
    this.quizService.quizTaker(score, new Date(), new Date(), studentId, quizId).subscribe(
      (data) => {console.log(data);  this.router.navigate(['/quiz/participate', quizId]); },
      (error) => { console.log(error); }
    );
  }

}
