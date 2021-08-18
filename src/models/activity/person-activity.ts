import { Payment } from "../payment/payment";
import { Ticket } from "./ticket";

export class PersonActivity {
  Id: number;
  PersonId: number | null;
  ActivityId: number | null;
  ActivityName: string;
  ActivityPlace: string;
  ActivityDate: Date | null;
  Payed: boolean | null;
  WasPresent: boolean | null;
  PayedAmount: number | null;
  TicketId: number | null;
  ActivityEnscriberId: number | null;
  OrganizationId: number | null;
  Ticket: Ticket;

  payment: Payment;

}
