export class ChapterModel {
    id: number;
    constructor(
      public entitled: string,
      public text: string,
      public course: number
    ) {}
}
