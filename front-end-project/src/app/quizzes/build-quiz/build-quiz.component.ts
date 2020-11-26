import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-build-quiz',
  templateUrl: './build-quiz.component.html',
  styleUrls: ['./build-quiz.component.scss']
})
export class BuildQuizComponent implements OnInit {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.quizForm = new FormGroup({
      quizName: new FormControl('', Validators.required),
      // answers: answerPropositions
      question_set: new FormArray([
        this.initQuestion(),
      ]),
    });

  }

  initQuestion() {
    return new FormGroup({
      questionTitle: new FormControl('', Validators.required),
      answer_set: new FormArray([
        this.initAnswer(),
      ]),
    });
  }

  initAnswer() {
    return new FormGroup({
      label: new FormControl('', Validators.required),
      is_correct: new FormControl('false', Validators.required),
    });
  }

  addQuestion() {
    const control = this.quizForm.get('question_set') as FormArray;
    control.push(this.initQuestion());
  }

  addAnswer(j) {
    console.log(j);
    // @ts-ignore
    const control = this.quizForm.get('question_set').controls[j].get('answer_set') as FormArray;
    // console.log(control);
    control.push(this.initAnswer());
  }

  getQuestions(form) {
    // console.log(form.get('sections').controls);
    return form.controls.question_set.controls;
  }
  getAnswers(form) {
    // console.log(form.controls.questions.controls);
    return form.controls.answer_set.controls;
  }

  removeQuestion(i) {
    const control = this.quizForm.get('question_set') as FormArray;
    control.removeAt(i);

  }

  removeAnswer(j, i) {
    // @ts-ignore
    const control = this.quizForm.get('question_set').controls[j].get('answer_set') as FormArray;
    control.removeAt(i);
  }


  public showData() {
    console.log(this.quizForm.value);
  }

  addQuiz(quiz) {
    if (! quiz.invalid) {
      console.log('valid');
    } else {
      console.log('invalid');
    }
  }
}
