import { Person } from "../Person/person";
import { WorkingYear } from "../working-year";

export class MemberList {
  Id: number;
  Number: number | null;
  WorkingYearId: number | null;
  ExportCode: string;
  WorkingYear: WorkingYear;
  Person: Person;
  PublicSavedPerson: Person;
  ReceivedHealthInsuranceCertificateOn: Date | null;
  PublicSavedPersonId: number | null;
  Saldo: number | null;
}

export class MemberPublic extends MemberList {
  FamilyMemberNr: number | null;
  MemberMoneyTeam1: number | null;
  FamilyDiscount: number | null;
  SocialDiscount: number | null;
  InvalidDiscount: number | null;
  OtherDiscount: number | null;
  InsuranceFee: number | null;
  Surplus: number | null;
  PayedAmount: number | null;
}



export class Member extends MemberList {
  SubscriptionDate: Date | null;
  StartDate: Date | null;
  EndDate: Date | null;
  PersonId: number | null;
  Payed: boolean | null;
  MemberTypeId: number | null;
  OrganizationId: number | null;
  NumberFederation: string;
  NumberBond: number | null;
  MemberMoneyTeam1: number | null;
  MemberMoneyTeam2: number | null;
  MemberMoneyTeam3: number | null;
  MemberMoneyTeam4: number | null;
  MemberMoneyTeam5: number | null;
  FamilyDiscount: number | null;
  SocialDiscount: number | null;
  InvalidDiscount: number | null;
  OtherDiscount: number | null;
  InsuranceFee: number | null;
  Surplus: number | null;
  PayedAmount: number | null;
  MemberMoneyPaidOnDate: Date | null;
  MemberMoneyIsNoLongerCollectible: boolean;
  ExtraTrainings: string;
  CompetitionDate: Date | null;
  DroppedOut: boolean | null;
  DateOfDropout: Date | null;
  YearDropout: number | null;
  YearDropoutMinusOne: number | null;
  DropOutHasBeenProcessed: boolean | null;
  HasCopiedVzfData: boolean | null;
  TeamNames: string[];
  FirstTeamName: string;
  FunctionNames: string[];
  FirstFunctionName: string;
  Phone: string;
  Email: string;
  PostCode: string;
  FamilyMemberNr: number | null;
  AccessKey: string;
}
