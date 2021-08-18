import { CustomEntityDefaultFieldList } from "./custom-entity-default-field";
import { CustomEntityPartList } from "./custom-entity-part";

export enum CustomEntityEnum {
  Persoon = 1,
  Organization = 2
}

export interface CustomEntityList {
  Id: number;
  Name: string;
  NameProperty: string;
  TypeName: string;
}

export interface CustomEntity extends CustomEntityList {
  CustomEntityDefaultFields: CustomEntityDefaultFieldList[];
  CustomEntityParts: CustomEntityPartList[];
}
