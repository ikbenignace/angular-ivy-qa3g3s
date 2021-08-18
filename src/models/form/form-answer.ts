export class FormAnswerList {
  Id: number;
  QuestionId: number;
  DocumentId: number;
  TableColumnId: number | null;
  TableRowNumber: number | null;
  PossibleAnswerId: number | null;
  Value: string;
  Points: number | null;
  AddedByUser: boolean | null;
  ChangedByUser: boolean | null;
  DeletedByUser: boolean | null;
  RelatedId: number | null;
}

export class FormAnswer extends FormAnswerList {

}
