import { IsoCountry } from "../location/IsoCountry";
import { CustomEntityObject } from "../customEntity/custom-entity-object";
import {AddressWithPersons, PersonXAddressList} from "../address";


export class PersonName {
  Id: number;
  FirstName: string;
  LastName: string;
  CannotDeleteMessage: string;
  AccessKey: string;
}

export class PersonWithContact extends PersonName {
  Gsm: string;
  HomePhone: string;
  WorkPhone: string;
  HomeEmail: string;
  WorkEmail: string;
  Website: string;
  BirthDate: Date | null;
  HasSocialDiscount: boolean;
  CanSendCommercial: boolean;

}

export class PersonNameAndAddress extends PersonWithContact {
  CallName: string;
  VotasNumber: string;
  BirthPlace: string;
  RegisterNumber: string;
  GenderId: number | null;
  NationalityId: number | null;
  HomeAddressId: number | null;
  IsTemp: boolean | null;
  //TODO Organization: OrganizationBasic;
  HomeAddress: AddressWithPersons;
}

export interface PersonWithDisability extends PersonNameAndAddress {
  DisabilityId: number | null;
  DisabilityDegreeId: number | null;
}

export interface PersonExport extends PersonNameAndAddress {
  TitleId: number | null;
  Picture: string;
  Achtervoegsel: string;
  FamilySituation: number | null;
  NationalityId: number | null;
  MoreInformation: string;
  Nationality: IsoCountry;
  CustomEntityObjectId: number | null;
  CustomEntityObject: CustomEntityObject;
  //TODO PersonXAddresses: PersonXAddressExport[];
}

export class PersonBasic extends PersonNameAndAddress {
  constructor() {
    super();
    this.PersonXAddresses = []
  }
  //TODO   AllOtherAddresses: AddressList[];
  PersonXAddresses: PersonXAddressList[];
  //TODO  AddressMembers: AddressMemberList[];
}

export class PersonList extends PersonBasic {
  constructor() {
    super();
  }
  TitleId: number | null;
  Picture: string;
  Achtervoegsel: string;
  FamilySituation: number | null;
  MoreInformation: string;
  Nationality: IsoCountry;
  CustomEntityObjectId: number | null;
  CustomEntityObject: CustomEntityObject;
  DisciplineClasificationStatusId: number | null;
  DisciplineClasificationRevisionDate: Date | null;
  IdentityDocumentUrl: string;
}

export class Person extends PersonList {
  constructor() {
    super();
  }

  Street: string;
  PostCode: string;
  Location: string;
  Country: string;
  OldMemberId: number | null;
  OldMemberYearId: number | null;
  GeneratedHistory: boolean | null;
  Memo1: string;
  Memo2: string;
  Memo3: string;
  Memo4: string;
  Memo5: string;
  OrganizationId: number | null;
  //TODO Disabilities: PersonXDisabilityList[];
}
