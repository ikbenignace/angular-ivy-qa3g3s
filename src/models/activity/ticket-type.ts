

export class TicketTypeList {
  Id: number;
  ActivityId: number;
  Name: string;
  Description: string;
  Price: number | null;
  PriceSocial: number | null;
  VatPercentage: number;
  Amount: number | null;
  OrgnizationId: number | null;
  CanChooseAmount: boolean;
  IsAttending: boolean;
  RelatedTicketTypeId: number | null;
  RelatedAmountToOrder: number | null;
  RelatedAmountToGive: number | null;
  MaxAmount: number | null;
  AmountSold: number | null;
  AmountPayed: number | null;
  Active: boolean;
  TicketColor: string;
  TicketLogo: string;
  SponsorLogo: string;
  TicketText: string;
  AskName: boolean;
  isSubmitting: boolean;
}

export class TicketType extends TicketTypeList {

}
