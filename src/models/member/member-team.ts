
export interface MemberTeamName {
  Name: string;
  NamePlural: string;
}


export interface MemberTeamList {
  Id: number;
  FollowNumber: number | null;
  Name: string;
  Code: string;
  MinAge: boolean | null;
  MinAgeNumber: number | null;
  MaxAge: boolean | null;
  MaxAgeNumber: number | null;
  Gender: number | null;
  StandardMemberMoney: number | null;
  InsuranceFee: number | null;
  ColorShirt: string;
  ColorShort: string;
  ColorSocks: string;
  MoreInfo: string;
  CreationDate: Date | null;
  HideInWaitingList: boolean | null;
  NumberOfHoursPerWeek: string;
  Disabled: boolean;
  TypeId: number | null;
  ClassificationId: number | null;
  IsYouth: boolean;
  //TODO SportsTeams: SportsXTeamsList[];
  CannotDeleteMessage: string;
}

export interface MemberTeam extends MemberTeamList {
 //TODO  Functions: FunctionList[];
}
