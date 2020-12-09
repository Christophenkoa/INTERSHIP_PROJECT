import {CourseModel} from '../course/courses.model';

export class ClassesModel {
  id: number;
  constructor(
    public class_number: number,
    public option: string,
    public level: string,
    public serie: string,
    public all_courses: CourseModel[]
  ) {}
}
