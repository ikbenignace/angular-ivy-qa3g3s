



export class PaymentList {
  Id: number;
  TypeId: number | null;
  Succeed: boolean;
  Canceled: boolean;
  Amount: number;
  Description: string;
  ExternalId: string;
  PaymentUrl: string;
  WebhookUrl: string;
  RedirectUrl: string;
  CreationDate: Date;
  OrganizationId: number | null;
  OrderId: number | null;
  InvoiceId: number | null;
  AccessKey: string;
}

export class Payment extends PaymentList {
  //PaymentType: PaymentTypeList;
}
