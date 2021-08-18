import { PersonWithContact } from "./Person/person";

export interface AddressMemberList {
  Id: number;
  Address: AddressList;
  AddressId: number | null;
  PersonId: number | null;
}

export class PersonXAddressBasic {

  Id: number;
  AddressId: number | null;
  PersonId: number | null;
  AddressMemberTypeId: number | null;
  SendPost: boolean | null;
  IsHidden: boolean | null;
}

export interface PersonXAddressExport extends PersonXAddressBasic {
  Address: AddressList;
}

export class PersonXAddressList extends PersonXAddressBasic {
  constructor() {
    super();
    this.Address = new AddressWithPersons();
  }
  Address: AddressWithPersons;
}

export class AddressXPersonList extends PersonXAddressBasic {
  Person: PersonWithContact;
  //TODO AddressMemberType: AddressMemberTypeList;
}

export class AddressList {
  Id: number;
  OrganizationId: number | null;
  AddressTypeId: number | null;
  Name: string;
  NameTicket: string;
  Street: string;
  Nr: string;
  Bus: string;
  PostCode: string;
  Location: string;
  Province: string;
  GSM: string;
  HomePhone: string;
  Email: string;
  Website: string;
  Country: string;
  Fax: string;
  JuridicStatuteId: number | null;
  Building: string;
  IsSwimmingPool: boolean | null;
  Family: boolean | null;
  AddressGroupId: number | null;
  Short: string;
  MoreInformation: string;
  AccountNumber: string;
  Iban: string;
  Bic: string;
  FollowNumber: string;
  EnterpriseNumber: string;
  customJuridicStatute: string;
  IsUsedForCompetitions: boolean | null;
  LengthOfPool: string;
  DateOfLastExamination: Date | null;
  Gewest: string;
}

export class Address extends AddressList {
  Disabled: boolean;
  FacebookUrl: string;
  InstagramUrl: string;
}

export class AddressWithPersons extends Address {
  PersonXAddresses: AddressXPersonList[];
}
