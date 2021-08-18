export class Ticket {
  Id: number;
  TypeId: number;
  Code: string;
  OrderItemId: number | null;
  LockedTime: Date | null;
  CheckinTime: Date | null;
  PersonId: number | null;
  OrganizationId: number | null;
  LockKey: string;
  OrderId: number | null;
}
