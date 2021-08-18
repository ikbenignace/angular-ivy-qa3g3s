import { CustomEntityFieldList } from "./custom-entity-field";
import { CustomEntityOptionList } from "./custom-entity-option";
import { CustomEntityObjectList } from "./custom-entity-object";

export interface CustomEntityFieldValueBasic {
  Id: number;
  CustomEntityObjectId: number;
  CustomEntityFieldId: number;
  Value: string;
  OrganizationId: number | null;
  OptionId: number | null;
  Salt: string;
  EncryptedValue: string;
  EncryptedOptionId: number | null;
}

export interface CustomEntityFieldValueList extends CustomEntityFieldValueBasic {
  CustomEntityField: CustomEntityFieldList;
  CustomEntityOption: CustomEntityOptionList;
}

export interface CustomEntityFieldValueWithEncryptedFields extends CustomEntityFieldValueList {

}

export interface CustomEntityFieldValue extends CustomEntityFieldValueList {
  CustomEntityObject: CustomEntityObjectList;
}
