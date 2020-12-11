import {GetcourseModel} from '../course/getcourses.model';

export class GetClassesModel {
  id: number;
  constructor(
    public class_number: number,
    public option: string,
    public level: string,
    public serie: string,
    public courses: GetcourseModel[],
    public teacher: number[]
  ) {}
}
