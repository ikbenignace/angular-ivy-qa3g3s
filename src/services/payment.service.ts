import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment, PaymentList } from '../models/payment/payment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService<Payment, PaymentList> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'payment');
  }

  check(paymentKey: string): Observable<Payment> {
    return this.get("/check?accessKey=" + paymentKey);
  }

  getByTicket(ticketId: number, accessKey:string): Observable<Payment> {
    return this.get("/byTicket/" + ticketId + "?accessKey=" + accessKey);
  }

}
