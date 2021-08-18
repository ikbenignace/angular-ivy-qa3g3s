import { CustomEntityFederationSettingsList } from "./custom-entity-federation-settings";
import { TranslationTextBasic } from "../translation-text";
import { CustomEntity } from "./custom-entity";
import { CustomEntityFieldList } from "./custom-entity-field";
import { CustomEntityPartList } from "./custom-entity-part";

export interface CustomEntityDefaultFieldBasic {
  Id: number;
  CustomEntityId: number;
  Name: string;
  CustomEntityPartId: number;
  ListOrder: number;
  CustomEntityFieldTypeId: number;
  TypeName: string;
}

export interface CustomEntityDefaultFieldList extends CustomEntityDefaultFieldBasic {
  CustomEntityFederationSettings: CustomEntityFederationSettingsList[];
}

export interface CustomEntityDefaultField extends CustomEntityDefaultFieldList {
  CustomEntity: CustomEntity;
  CustomEntityField: CustomEntityFieldList[];
  CustomEntityPart: CustomEntityPartList;
}
