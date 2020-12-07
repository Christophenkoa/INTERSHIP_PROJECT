import {CourseModel} from '../course/courses.model';
import {TeacherModel} from '../teacher/teacher.model';

export class ClassesModel {
  constructor(
    public id: number,
    public level: string,
    public class_number: string,
    public option: string,
    public serie: string,
    public all_courses: CourseModel[],
    public teacher: TeacherModel[]
  ) {}
}
