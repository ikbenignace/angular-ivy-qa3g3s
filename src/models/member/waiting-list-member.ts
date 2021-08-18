import { Person } from "../Person/person";
import { WaitingListMemberWorkgroup } from "../Person/workgroup";



export class WaitingListMemberList {
  constructor() {
    this.Person = new Person();
  }

  Id: number;
  PersonId: number;
  OrganizationId: number | null;
  SubscriptionDate: Date;
  StartDate: Date | null;
  MemberMoney: number | null;
  InsuranceFee: number | null;
  FamilyDiscount: number | null;
  FamilyMemberNr: number | null;
  Saldo: number | null;
  MemberMoneyTeam1: number | null;
  SocialDiscount: number | null;
  InvalidDiscount: number | null;
  OtherDiscount: number | null;
  Surplus: number | null;
  PayedAmount: number | null;
  Person: Person;
  WorkingYearId: number | null;
  //TODO WorkingYear: WorkingYear;
  ImportedFromId: number | null;
  TeamId: number | null;
  IsVolunteer: boolean;
  //TODO Team: MemberTeamList;

  WaitingListMemberWorkgroups: WaitingListMemberWorkgroup[];


}

export class WaitingListMember extends WaitingListMemberList {
  constructor() {
    super()
  }
  //TODO: organization: OrganizationList;
}


export interface WaitingListMemberSavedResponse {

  paymentUrl: string;
  memberAccessKey: string;

}
