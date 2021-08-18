import { CustomEntityDefaultFieldBasic } from "./custom-entity-default-field";
import { CustomEntityFieldTypeList } from "./custom-entity-field-type";

export interface CustomEntityFederationSettingsList {
  Id: number;
  FederationId: number | null;
  CustomEntityDefaultFieldId: number;
  CustomEntityFieldTypeId: number;
  CanEditShowPublic: boolean;
  CanEditRequiredPublic: boolean;
  ShowPublic: boolean;
  Show: boolean;
  RequiredPublic: boolean;
  Required: boolean;
  CustomEntityDefaultField: CustomEntityDefaultFieldBasic;
}

export interface CustomEntityFederationSettings extends CustomEntityFederationSettingsList {
  CustomEntityFieldType: CustomEntityFieldTypeList;
 //TODO Federation: FederationList;
}
