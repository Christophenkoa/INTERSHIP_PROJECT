export class TeacherModel {
  constructor(public username: string,
              public firstName: string,
              public lastName: string,
              public password: string,
              public tel: number,
              public email: string,
              public gender: string,
              public isActive: boolean,
              public isStaff: boolean,
              public isSuperuser: boolean
  ) {}
}
