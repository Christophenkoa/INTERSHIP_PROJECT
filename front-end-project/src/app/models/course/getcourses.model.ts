import {TeacherModel} from '../teacher/teacher.model';
import {ChapterModel} from '../chapter/chapters.model';

export class GetcourseModel {
  id: number;
  chapter_list: ChapterModel[];
  constructor(
    public entitled: string,
    public coefficient: number,
    public course_teacher: TeacherModel,
  ) {}
}
