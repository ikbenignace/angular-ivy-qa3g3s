import { CustomEntityFieldList } from "../customEntity/custom-entity-field";

export class PersonFormFieldList {
  Id: number;
  PersonFormId: number;
  CustomEntityFieldId: number | null;
  Show: boolean;
  Required: boolean;
  ListOrder: number;
  OrganizationId: number | null;
  CustomEntityField: CustomEntityFieldList;

  key: string;
}

export class PersonFormField extends PersonFormFieldList {

}
