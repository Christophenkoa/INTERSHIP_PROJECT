import {Question} from './question';

export class Quiz {
  constructor(public id: number,
              public entitle: string,
              public createdAt: Date,
              public questions: Question[]
  ) {}
}
