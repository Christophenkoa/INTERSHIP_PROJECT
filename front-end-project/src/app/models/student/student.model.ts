export class StudentModel {
  constructor(public RegisNbre: string,
              public name: string,
              public surname: string,
              public password: string,
              public tel: number,
              public email: string,
              public dateBirth: Date,
              public gender: string,
              public isActive: boolean,
              public isStaff: boolean,
              public isSuperuser: boolean
              ) {}
}
