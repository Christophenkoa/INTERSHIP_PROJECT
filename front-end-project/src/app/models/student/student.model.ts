export class StudentModel {
  constructor(public RegisNbre: string,
              public name: string,
              public surname: string,
              public password: string,
              public tel: number,
              public email: string,
              public dateBirth: Date,
              public gender: string,
              public is_active: boolean,
              public is_staff: boolean,
              public is_superuser: boolean
              ) {}
}
