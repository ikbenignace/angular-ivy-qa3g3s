import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { BaseComponent } from '../../base/base.component';
import { TranslationTextService } from '../../../services/translation-text.service';
import { OrganizationService } from '../../../services/organization.service';
import { CustomEntityEnum } from '../../../models/customEntity/custom-entity';
import { MemberPublic } from '../../../models/member/member';
import { ActivityService } from '../../../services/activity.service';
import { Activity, ActivityList } from '../../../models/activity/activity';
import { PersonActivityService } from '../../../services/person-activity.service';
import { PersonActivity } from '../../../models/activity/person-activity';
import { WaitingListMemberService } from '../../../services/waiting-list-member.service';
import { WaitingListMember } from '../../../models/member/waiting-list-member';
import { MomentList } from '../../../models/moment/moment';
import { TicketService } from '../../../services/ticket.service';
import { TicketType, TicketTypeList } from '../../../models/activity/ticket-type';
import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../models/payment/payment';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent extends BaseComponent implements OnInit {
  memberKey: string;
  member: MemberPublic;
  waitingListMember: WaitingListMember;
  activities: ActivityList[];
  isSubmitting: boolean;
  isLoading = true;
  type: string;
  paymentKey: string;
  payment: Payment;
  personActivities: PersonActivity[];

  constructor(
    protected route: ActivatedRoute,
    private router: Router,
    protected organizationService: OrganizationService,
    private memberService: MemberService,
    private waitinglistMemberService: WaitingListMemberService,
    private activityService: ActivityService,
    private ticketService: TicketService,
    private paymentService: PaymentService,
    private personActivityService: PersonActivityService,
    protected translationTextService: TranslationTextService,

  ) {
    super(null, route, organizationService, translationTextService, null);
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.memberKey = params.get('memberKey');
      this.language = params.get('language');
      this.type = params.get('type');
      this.paymentKey = params.get('paymentKey');

      if (this.paymentKey) {
        if (this.paymentKey != "FREE")
          this.paymentService.check(this.paymentKey).subscribe(payment => {
            this.payment = payment;
            this.isLoading = false;
          })
        else {
          this.payment = new Payment();
          this.payment.Id = 0;
          this.payment.Succeed = true;
          this.isLoading = false;
        }
      } else
        if (this.type == 'waitingListMember') {
          this.waitinglistMemberService.getByKey(this.memberKey, this.accessKey).subscribe(result => {
            if (!result) { //wachtlid is overgezet
              this.memberService.getAccessKeyByWaitinglistMemberAccessKey(this.memberKey, this.accessKey).subscribe(memberKey => {
                if (memberKey)
                  this.router.navigateByUrl('/NL/' + this.accessKey + '/activity/' + memberKey + '/subscribe');
              })
            } else {
              this.waitingListMember = result;
              this.person = this.waitingListMember.Person;
              this.personActivityService.getByPerson(this.memberKey, this.accessKey).subscribe(pa => this.personActivities = pa)
              this.init();
            }
          });
          this.activityService.getAllSubscribableForWaitingListMember(this.memberKey, this.accessKey).subscribe(data => {
            this.activities = data;
            this.isLoading = false;
            this.activitiesLoaded()
          });
        }
        else {
          this.memberService.getByKey(this.memberKey, this.accessKey).subscribe(result => {
            if (!result) { //foute leden key, kan de wachtlidkey zijn
              this.memberService.getAccessKeyByWaitinglistMemberAccessKey(this.memberKey, this.accessKey).subscribe(memberKey => {
                this.router.navigateByUrl('/NL/' + this.accessKey + '/activity/' + memberKey + '/subscribe');
              })
            } else {
              this.member = result;
              this.person = this.member.Person;
              this.personActivityService.getByPerson(this.memberKey, this.accessKey).subscribe(pa => this.personActivities = pa)
              this.init();
            }

          });

          this.activityService.getAllSubscribableForMember(this.memberKey, this.accessKey).subscribe(data => {
            this.activities = data;
            this.isLoading = false;
            this.activitiesLoaded()
          });

        }


    });

  }

  activitiesLoaded() {
    for (var i = 0; i < this.activities.length; i++) {
      if (!this.activities[i].WhereAndWhen) {
        if (this.activities[i].Moments.length > 1) {
          this.activities[i].WhereAndWhen = 3;
        } else {
          if (!this.activities[i].ActivityDateEnd) {
            this.activities[i].WhereAndWhen = 1;
          } else {
            this.activities[i].WhereAndWhen = 2;
          }
        }
      }
    }
    for (var i = 0; i < this.activities.length; i++) {
      if (this.activities[i].Moments) {
        this.activities[i].Moments = this.activities[i].Moments.sort((a, b) => new Date(a.StartDateTime).getTime() - new Date(b.StartDateTime).getTime())
      }

    }
  }

  subscribe(a: ActivityList, t: TicketTypeList) {
    const hostname = "https://www.mijnassist.be/"
    if (!a.isSubmitting) {
      a.isSubmitting = true;
      if (t) {// er zijn tickets verbonden aan de activiteit
        t.isSubmitting = true;
        this.ticketService.lock(1, t.Id, a.AccessKey).subscribe(lockKey => {
          if (this.type == 'waitingListMember') {
            if (lockKey) {
              this.ticketService.orderAndPayTicketsForwaitinglistMember(this.memberKey, this.accessKey, lockKey, a.AccessKey, false, hostname + this.language + "/" + this.accessKey + "/activity/" + this.memberKey + "/paid/waitingListMember/").subscribe(paymentUrl => {
                window.location.href = paymentUrl;
              })
            } else {
              alert("Oei, je inschrijving is niet gelukt. Er is net iemand je voor geweest voor dit laatste plekje.")
              this.activityService.getAllSubscribableForWaitingListMember(this.memberKey, this.accessKey).subscribe(data => {
                this.activities = data;
                t.isSubmitting = true;
              })
            }
          } else {
            if (lockKey) {
              this.ticketService.orderAndPayTicketsForMember(this.memberKey, this.accessKey, lockKey, a.AccessKey, false, hostname + this.language + "/" + this.accessKey + "/activity/" + this.memberKey + "/paid/").subscribe(paymentUrl => {
                window.location.href = paymentUrl;
              })
            } else {
              alert("Oei, je inschrijving is niet gelukt. Er is net iemand je voor geweest voor dit laatste plekje.")
              this.activityService.getAllSubscribableForMember(this.memberKey, this.accessKey).subscribe(data => {
                this.activities = data;
                a.isSubmitting = true;
              })
            }
          }

        });
      } else {//inschrijving zonder tickets
        if (this.type == 'waitingListMember') {
          this.personActivityService.addForWaitingListMember({ PersonId: this.person.Id, ActivityId: a.Id } as PersonActivity, this.memberKey, this.accessKey).subscribe(newMemberKey => {
            if (newMemberKey != null) {
              this.memberService.pay(newMemberKey, this.accessKey, 'https://www.mijnassist.be/NL/' + this.accessKey + '/member/' + newMemberKey + '/pay').subscribe(result => {
                window.location.href = result;
              })
            } else {
              alert("Oei, je inschrijving is niet gelukt. Er is net iemand je voor geweest voor dit laatste plekje.")
              this.activityService.getAllSubscribableForWaitingListMember(this.memberKey, this.accessKey).subscribe(data => {
                this.activities = data;
                a.isSubmitting = true;
              })
            }
            //this.router.navigateByUrl('/NL/' + this.accessKey + '/member/' + newMemberKey + '/pay');
            a.isSubmitting = true;
          });
        } else {
          this.personActivityService.add({ PersonId: this.person.Id, ActivityId: a.Id } as PersonActivity, this.accessKey).subscribe(data => {
            if (data != null) {
              this.activityService.getAllSubscribableForMember(this.memberKey, this.accessKey).subscribe(data => {
                this.activities = data;
                this.personActivityService.getByPerson(this.memberKey, this.accessKey).subscribe(pa => this.personActivities = pa)
                this.memberService.pay(this.memberKey, this.accessKey, 'https://www.mijnassist.be/NL/' + this.accessKey + '/member/' + this.memberKey + '/pay').subscribe(result => {
                  if (result)
                    window.location.href = result;
                })

                //this.router.navigateByUrl('/NL/' + this.accessKey + '/member/' + this.memberKey + '/pay');
                a.isSubmitting = true;
              })
            } else {
              alert("Oei, je inschrijving is niet gelukt. Er is net iemand je voor geweest voor dit laatste plekje.")
              this.activityService.getAllSubscribableForMember(this.memberKey, this.accessKey).subscribe(data => {
                this.activities = data;
                a.isSubmitting = true;
              })
            }
          });
        }
      }
    }
  }

  isFull(activity: ActivityList, t: TicketType) {
    if (t) {
      return !(t.AmountSold < t.Amount);
    } else {
      return activity.NrPersonActivities >= activity.NrParticipant;
    }

  }

  getPrice(a: ActivityList, t: TicketTypeList) {
    if (t) {
      if (this.person.HasSocialDiscount)
        return t.PriceSocial == null ? t.Price : t.PriceSocial;
      else
        return t.Price
    } else {
      return (this.member ? this.member.Saldo * -1 : this.waitingListMember.MemberMoney);
    }
  }

  isAttending(activity: ActivityList, t: TicketTypeList) {
    if (!this.personActivities)
      return false;
    for (let i = 0; i < this.personActivities.length; i++) {
      if (this.personActivities[i].ActivityId == activity.Id) {
        if (t) {
          if (this.personActivities[i].TicketId && this.personActivities[i].Ticket.TypeId == t.Id) {
            if (!this.personActivities[i].payment && !t.isSubmitting) {
              t.isSubmitting = true
              if (this.getPrice(activity, t) == 0) {
                t.isSubmitting = false
                this.personActivities[i].payment = new Payment();
                this.personActivities[i].payment.Succeed = true;
                return true
              } else {
                this.paymentService.getByTicket(this.personActivities[i].TicketId, this.accessKey).subscribe(payment => {
                  t.isSubmitting = false
                  this.personActivities[i].payment = payment
                });
              }
            }
            else return true
          }
        } else {//zonder tickets
          return true;
        }
      }
    }
    return false;
  }


  getAddress(activity: ActivityList) {
    if (activity.Address)
      return activity.Address
    if (activity.Moments && activity.Moments[0])
      return activity.Moments[0].Address
  }

  getStartDate(activity: ActivityList) {
    if (activity.ActivityDate)
      return activity.ActivityDate;
    if (activity.Moments)
      var min = activity.Moments[0].StartDateTime;
    for (var i = 0; i < activity.Moments.length; i++) {
      if (min > activity.Moments[i].StartDateTime)
        min = activity.Moments[i].StartDateTime;
    }
    return min;
  }

  getStartDateFromTime(activity: ActivityList) {
    if (activity.FromTime)
      return activity.FromTime;
  }

  getStartDateTillTime(activity: ActivityList) {
    if (activity.TillTime)
      return activity.TillTime;
  }

  getEndDate(activity: ActivityList) {
    if (activity.ActivityDateEnd)
      return activity.ActivityDateEnd;
    if (activity.Moments && activity.Moments.length > 0) {
      var max = activity.Moments[0].EndDateTime;
      for (var i = 0; i < activity.Moments.length; i++) {
        if (max < activity.Moments[i].StartDateTime)
          max = activity.Moments[i].StartDateTime;
      }
      return max;
    }
  }

}
