export class WorkGroup {
  Id: number;
  Name: string;
  Short: string;
  Editable: boolean | null;
  Deleteable: boolean | null;
  MasterWorkgroupId: number | null;
  LoadDuringSetup: boolean;
  CannotDeleteMessage: string;
  MoreInfo: string;
  ParentId: number | null;
  HasChildren: boolean;
  Disabled: boolean;
  IsStandardVzfWorkgroup: boolean | null;
  Children: WorkGroup[];
}

export class WaitingListMemberWorkgroup {
  Id: number;
  WaitingListMemberId: number;
  WorkgroupId: number;
  ListOrder: number | null;
  Workgroup: WorkGroup;
}
