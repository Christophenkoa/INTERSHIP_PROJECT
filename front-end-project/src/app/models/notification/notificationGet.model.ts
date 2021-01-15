import {TeacherModel} from '../teacher/teacher.model';
import {ClassesModel} from '../class/classes.model';

export class NotificationGetModel {
  constructor(
    public message: string,
    public is_checked: boolean,
    public teacher_details: TeacherModel,
    public classe_details: ClassesModel
  ) {}
}
