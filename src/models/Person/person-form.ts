import { PersonFormFieldList } from "./person-form-field";

export class PersonFormList {
  Id: number;
  AccessKey: string;
  ConvertToPerson: boolean;
  ConvertToMember: boolean;
  AddToWaitingList: boolean;
  NeedToPayMemberMoney: boolean;
  UseWorkgroups: boolean;
  UseMemberTeams: boolean;
  UseProducts: boolean;
  WorkgroupRequired: boolean;
  MemberTeamRequired: boolean;
  ProductRequired: boolean;
  OrganizationId: number | null;
  PrivacyUrl: string
  ShowCanSendCommercial: boolean;


}

export class PersonForm extends PersonFormList {
  PersonFormFields: PersonFormFieldList[];
}
