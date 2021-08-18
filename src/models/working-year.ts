export class WorkingYearList {
  Id: number;
  StartDate: Date | null;
  EndDate: Date | null;
  Name: string;
  MoreInfo: string;
  FullYear: boolean | null;
  IsSelected: boolean;
  OrganizationId: number | null;
}

export class WorkingYear extends WorkingYearList {

}
