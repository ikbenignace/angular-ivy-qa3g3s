import { FormParagraph } from "./form-paragraph";
import { FormQuestionType } from "./form-question-type";
import { FormQuestionPossibleAnswer } from "./form-question-possible-answer";
import { FormQuestionColumn } from "./form-question-column";
import { FormQuestionDirection } from "./form-question-direction";

export class FormQuestionList {

  Id: number;
  ParagraphId: number;
  ListOrder: number;
  Question: string;
  InfoToGivePoints: string;
  QuestionTypeId: number;
  Description: string;
  NumberOfLines: number | null;
  QuestionDirectionId: number | null;
  QuestionDisplayModeId: number | null;
  FilterStartYear: number | null;
  FilterEndYear: number | null;
  DependentUponQuestionId: number | null;
  DependentUponQuestionAnswerId: number | null;
  DependentUponQuestionAnswerList: string;
  AutoLoadMembers: boolean | null;
  MultipleMembersAllowed: boolean | null;
  OnlyBijscholingen: boolean | null;
  FormQuestionDirection: FormQuestionDirection;
  FieldName: string;
  TextIfYes: string;
  TextIfNo: string;
  IsRequired: boolean | null;
  ShowExplanation: boolean | null;
  PossibleAnswers: FormQuestionPossibleAnswer[];
  QuestionColumns: FormQuestionColumn[];
  //ActivityTypes: FormQuestionActivityType[];
  //AgeCategories: FormQuestionAgeCategory[];
  //Functions: FormQuestionFunction[];
  //WorkGroups: FormQuestionWorkGroup[];
  Diplomas: FormQuestionDiploma[];

  key: string;
  isVisible: boolean;

}

export class FormQuestionDiploma {
  Id: number;
  QuestionId: number;
  DiplomaId: number;
}

export class FormQuestion extends FormQuestionList {
  Paragraph: FormParagraph;
  QuestionType: FormQuestionType;
}
