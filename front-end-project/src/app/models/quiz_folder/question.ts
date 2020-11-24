import {Answer} from './answer';

export class Question {
  constructor(public id, public questionDesc: string, public answers: Answer[]) {}
}
