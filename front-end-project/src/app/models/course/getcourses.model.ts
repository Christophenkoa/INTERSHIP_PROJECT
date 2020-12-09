import {TeacherModel} from '../teacher/teacher.model';

export class GetcourseModel {
  id: number;
  constructor(
    public entitled: string,
    public coefficient: number,
    public course_teacher: TeacherModel,
  ) {}
}
