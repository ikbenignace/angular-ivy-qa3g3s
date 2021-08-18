import { Address } from "./address";
import { JurState } from "./jur-state";

export interface OrganizationPublic {
  Id: number;
  Short: string;
  Acronym: string;
  ClubCode: string;
  Name: string;
  WaitingListPublicFormWorkingYearId: number | null;
  ClubWebsiteCss: string;
  CustomThankyouText: string;
  LogoFileUrl: string;
  BTWNumber: string;
  Address: Address;
  JurState: JurState;
  ChamberOfCommerceAddress: Address;
}
