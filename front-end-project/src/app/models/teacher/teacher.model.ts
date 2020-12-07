export class TeacherModel {
  id: number;
  constructor(public username: string,
              public first_name: string,
              public last_name: string,
              public password: string,
              public tel: number,
              public email: string,
              public gender: string,
              public isActive: boolean,
              public isStaff: boolean,
              public isSuperuser: boolean
  ) {}
}
