import { Address } from "../address";
import { MomentList } from "../moment/moment";
import { Payment } from "../payment/payment";
import { PersonNameAndAddress } from "../Person/person";
import { PersonActivity } from "./person-activity";
import { TicketTypeList } from "./ticket-type";

export class ActivityBasic {
  Id: number;
  Name: string;
  ActivityDate: Date | null;
  FromTime: string;
  TillTime: string;
  MoreDays: string;
  LocationId: number | null;
  ActivityTypeId: number | null;
  ResponsibleId: number | null;
  NrParticipant: number | null;
  NrHoursCourse: number | null;
  WorkyearId: number | null;
  ResponsibleFreeText: string;
  InGdprLogbook: boolean | null;
  OrganizationId: number | null;
  AccessKey: string;
  GuestKey: string;
  SendTicketsAfterPayment: boolean | null;
  TicketMailTemplate: string;
  TermsAndConditions: string;
  TextTicket: string;
  TextTicketList: string;
  TextOrderPage: string;
  TextPayed: string;
  Logo: string;
  TextCheckCommercial: string;
  TextCheckTermsAndCoditions: string;
  ActivityDateEnd: Date | null;
  Website: string;
  SocialMedia: string;
  Email: string;
  Telephone: string;
  Disabled: boolean;
  MoreInfo: string;
  OrderFromDateTime: Date | null;
  OrderTillDateTime: Date | null;
  PresentMembers: string[];
  CannotDeleteMessage: any;
  TransactionCount: number;
  WhereAndWhen:number | null;

  Address: Address;
  Moments: MomentList[];

  CanSubscribe: boolean;



}

export class Activity extends ActivityBasic {
}


export class ActivityList extends ActivityBasic {
  TicketTypes: TicketTypeList[];
  NrPersonActivities: number;

  isSubmitting: boolean;
  payment: Payment;
}

//export interface Activity extends ActivityBasic {
//  ActivityType: ActivityType;
//  Address: Address;
//  Responsible: Person;
//  TicketTypes: TicketTypeList[];
//  SportActivities: SportActivityList[];
//  Workingyear: WorkingYear;
//}

//export class ActivityList extends ActivityBasic {
//  ActivityType: ActivityType;
//  Address: Address;
//  Responsible: PersonNameAndAddress;
//  TicketTypes: TicketTypeList[];
//  SportActivities: SportActivityList[];
//}
