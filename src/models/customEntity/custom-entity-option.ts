import { CustomEntityFieldList } from "./custom-entity-field";
import { CustomEntityFieldValueList } from "./custom-entity-field-value";

export interface CustomEntityOptionBasic {
  Id: number;
  CustomEntityFIeldId: number;
  OrganizationId: number | null;
  Name: string;
  ListOrder: number;
}

export interface CustomEntityOptionList extends CustomEntityOptionBasic {

}

export interface CustomEntityOption extends CustomEntityOptionList {
  CustomEntityField: CustomEntityFieldList;
  CustomEntityFieldValue: CustomEntityFieldValueList[];
}
