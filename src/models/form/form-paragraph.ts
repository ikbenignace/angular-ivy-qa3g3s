import { FormQuestionList } from "./form-question";

export class FormParagraphList {
  Id: number;
  PageId: number;
  OrganizationId: number | null;
  Title: string;
  Introduction: string;

  get key(): string {
    return 'paragraph' + this.Id;
  }
}

export class FormParagraph extends FormParagraphList {
  Questions: FormQuestionList[];
}
