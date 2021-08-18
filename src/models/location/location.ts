import { OrganizationPublic } from "../organization";

export interface LocationBasic {
  Id: number;
  PostCode: string;
  Gemeente: string;
  Region: string;
  Provincie: number | null;
  Land: number | null;
  NIScode: string;
  GemeenteID: number | null;
  OrganizationId: number | null;
  Hoofdgemeente: boolean | null;
  GerechtelijkArrondissement: string;
}

export interface Location extends LocationBasic {
  Country: Country;
  Organization: OrganizationPublic;
  Province: Province;
}


export interface Country {
  Id: number;
  Name: string;
  OrganizationId: number | null;
}

 

export interface Province {
  Id: number;
  Name: string;
  OrganizationId: number | null;
}
