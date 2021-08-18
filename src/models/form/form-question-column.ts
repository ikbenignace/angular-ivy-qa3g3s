import { FormQuestionPossibleColumn } from "./form-question-possible-column";

export class FormQuestionColumnList {
  Id: number;
  Name: string;
  ListOrder: number | null;
  IsMemberSelectMultiple: boolean | null;
  CanUpdateClubData: boolean | null;
  ColumnId: number;
  Column: FormQuestionPossibleColumn;
}

export class FormQuestionColumn extends FormQuestionColumnList {
}
