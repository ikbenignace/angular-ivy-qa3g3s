import { Activity, ActivityBasic } from "../activity/activity";
import { Address } from "../address";
import { MemberTeamList } from "../member/member-team";

export class MomentBasic {
  Id: number;
  MemberTeamId: number | null;
  ActivityId: number | null;
  StartDateTime: Date;
  EndDateTime: Date;
  AddressId: number | null;
  OrganizationId: number | null;
  Address: Address;
}
export class Moment extends MomentBasic {
  MemberTeam: MemberTeamList;
  Activity: Activity;
}

export class MomentList extends MomentBasic {
  MemberTeam: MemberTeamList;
  Activity: ActivityBasic;
}
