import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassService} from '../../services/classes/class.service';
import {ClassesModel} from '../../models/class/classes.model';
import {Subject} from 'rxjs';
import {QuizService} from '../../services/quizz/quiz.service';
import {Quiz} from '../../models/quiz_folder/quiz';


@Component({
  selector: 'app-build-quiz',
  templateUrl: './build-quiz.component.html',
  styleUrls: ['./build-quiz.component.scss']
})
export class BuildQuizComponent implements OnInit {

  constructor(private classService: ClassService, private quizService: QuizService) { }
  quizForm: FormGroup;
  success: boolean;

  myQuiz: Quiz;

  classes: ClassesModel[] =  [new ClassesModel(0,
    '', '', '', [], [])];

  // keep value of the selected class
  selectedClass: number;
  selectedClassSubject = new Subject<number>();

  public isNull(item: any) {
    return item == null ? '' : item;
  }

  ngOnInit() {
    this.selectedClass = 0;
    this.createForm();
    this.success = false;
    // Normally we should filter classes per teacher
    this.classService.GetAllClasses()
      .subscribe(
        (data) => {this.classes = data; console.log(this.classes); },
        (error) => {console.log(error); }
      );
  }

  emit() {
    this.selectedClassSubject.next(this.selectedClass);
  }

  selectedClassF(index: number) {
    this.selectedClass = index;
    this.emit();
  }


  public createForm() {
    this.quizForm = new FormGroup({
      quizClass: new FormControl('', Validators.required),
      quizCourse: new FormControl('', Validators.required),
      quizName: new FormControl('', Validators.required),
      // answers: answerPropositions
      questions: new FormArray([
        this.initQuestion(),
      ]),
    });

  }

  initQuestion() {
    return new FormGroup({
      question_desc: new FormControl('', Validators.required),
      answers: new FormArray([
        this.initAnswer(),
      ]),
    });
  }

  initAnswer() {
    return new FormGroup({
      answer: new FormControl('', Validators.required),
      isCorrect: new FormControl('false', Validators.required),
    });
  }

  addQuestion() {
    const control = this.quizForm.get('questions') as FormArray;
    control.push(this.initQuestion());
    // remove success div
    this.success = false;
  }

  addAnswer(j) {
    console.log(j);
    // @ts-ignore
    const control = this.quizForm.get('questions').controls[j].get('answers') as FormArray;
    // console.log(control);
    control.push(this.initAnswer());
    // remove success div
    this.success = false;
  }

  getQuestions(form) {
    // console.log(form.get('sections').controls);
    return form.controls.questions.controls;
  }
  getAnswers(form) {
    // console.log(form.controls.questions.controls);
    return form.controls.answers.controls;
  }

  removeQuestion(i) {
    const control = this.quizForm.get('questions') as FormArray;
    control.removeAt(i);

  }

  removeAnswer(j, i) {
    // @ts-ignore
    const control = this.quizForm.get('questions').controls[j].get('answers') as FormArray;
    control.removeAt(i);
  }

  addQuiz(quiz) {
    if (! quiz.invalid) {
      this.success = true;
      this.myQuiz = new Quiz(quiz.value.quizName, quiz.value.quizCourse,
        15, quiz.value.quizClass, 2, quiz.value.questions);

      this.quizService.postQuiz(this.myQuiz)
        .subscribe(
          (data) => {console.log('return value : ' + data); },
          (error) => {console.log(error); }
        );

      // console.log(this.allQuestions);
      // console.log('select : ' + this.selectedClass);
      // console.log(quiz);
    } else {
      this.success = false;
      console.log('invalid');
    }
  }
}
