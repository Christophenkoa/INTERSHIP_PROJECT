import {Question} from './question';

export class Quiz {
  id: number;
  constructor(
    public entitled: string,
    public course: number,
    public req_time: number,
    public classe: number,
    public teacher: number,
    public questions: Question[]
  ) {}
}
