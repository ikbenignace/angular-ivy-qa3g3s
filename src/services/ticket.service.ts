import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/activity/ticket';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService<Ticket, Ticket> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'tickets');
  }

  lock(numberOfTickets: number, ticketTypeId: number, activityKey: string) {
    return this.http.get<string>(this.baseUrl + this.controller + "/lock?numberOfTickets=" + numberOfTickets + "&ticketTypeId=" + ticketTypeId + "&activityKey=" + activityKey );
  }

  orderAndPayTicketsForMember(memberKey: string, orgKey: string, lockKey: string, activityAccessKey: string, canSendCommercial: boolean, returnUrl: string): Observable<any> {
    return this.post("/orderAndPay/Member/" + memberKey + "?orgKey=" + orgKey + "&lockKey=" + lockKey + "&activityAccessKey=" + activityAccessKey + "&canSendCommercial=" + canSendCommercial + "&returnUrl=" + returnUrl, null);
  }


  orderAndPayTicketsForwaitinglistMember(memberKey: string, orgKey: string, lockKey: string, activityAccessKey: string, canSendCommercial: boolean, returnUrl: string): Observable<any> {
    return this.post("/orderAndPay/waitinglistMember/" + memberKey + "?orgKey=" + orgKey + "&lockKey=" + lockKey + "&activityAccessKey=" + activityAccessKey + "&canSendCommercial=" + canSendCommercial + "&returnUrl=" + returnUrl, null);
  }


}
