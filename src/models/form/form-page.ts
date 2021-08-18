import { FormParagraph } from "./form-paragraph";
import { FormList } from "./form";

export class FormPageList {
  Id: number;
  FormId: number | null;
  OrganizationId: number | null;
  Title: string;
  Introduction: string;
  PageNumber: number | null;
  ChecklistQuestionId: number | null;
  Paragraphs: FormParagraph[];

  get key(): string {
    return 'page' + this.Id;
  }
}

export class FormPage extends FormPageList {
  //ChecklistQuestion: ChecklistQuestionList;
  Form: FormList;
}

export class FormPageQuestionAndAnswer {
  FormPage: FormPage;
  //Answers: FormAnswer[];
  //Explanations: FormAnswerExplanationList[];
}
