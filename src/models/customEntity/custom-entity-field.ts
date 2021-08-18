import { CustomEntityDefaultFieldList } from "./custom-entity-default-field";
import { CustomEntityFieldTypeList } from "./custom-entity-field-type";
import { CustomEntityOptionList } from "./custom-entity-option";
import { CustomEntityList } from "./custom-entity";
import { CustomEntityPartList } from "./custom-entity-part";
import { TranslationTextBasic } from "../translation-text";

export interface CustomEntityFieldList {
  Id: number;
  CustomEntityId: number;
  CustomEntityPartId: number;
  CustomEntityFieldTypeId: number;
  CustomEntityDefaultFieldId: number | null;
  OrganizationId: number | null;
  Name: string;
  RequiredPublic: boolean;
  RequiredWaitinglist: boolean;
  Required: boolean;
  IsEncrypted: boolean;
  FederationId: number | null;
  VisibleForClub: boolean | null;
  FederationFieldId: number | null;
  ShowPublic: boolean;
  ShowWaitinglist: boolean;
  Show: boolean;
  ListOrder: number;
  ShowAlways: boolean;
  CustomEntityDefaultField: CustomEntityDefaultFieldList;
  CustomEntityFieldType: CustomEntityFieldTypeList;
  CustomEntityOptions: CustomEntityOptionList[];
}

export interface CustomEntityField extends CustomEntityFieldList {
  CustomEntity: CustomEntityList;
  CustomEntityPart: CustomEntityPartList;
}
