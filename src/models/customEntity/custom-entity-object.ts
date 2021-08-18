import { CustomEntityList } from "./custom-entity";
import { CustomEntityFieldValueList } from "./custom-entity-field-value";

export interface CustomEntityObjectBasic {
  Id: number;
  CustomEntityId: number;
  OrganizationId: number | null;
}

export interface CustomEntityObjectList extends CustomEntityObjectBasic {

}

export interface CustomEntityObject extends CustomEntityObjectList {
  CustomEntity: CustomEntityList;
  CustomEntityFieldValues: CustomEntityFieldValueList[];
}
