export class FormList {
    Id: number;
    Key: string;
    OrganizationId: number | null;
    SportId: number | null;
  StatusId: number;


  get key(): string {
    return 'form' + this.Id;
  }
}
