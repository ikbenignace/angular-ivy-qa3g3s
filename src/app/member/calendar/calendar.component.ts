import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomEntityEnum } from '../../../models/customEntity/custom-entity';
import { MemberPublic } from '../../../models/member/member';
import { MomentList } from '../../../models/moment/moment';
import { MemberService } from '../../../services/member.service';
import { MomentService } from '../../../services/moment.service';
import { OrganizationService } from '../../../services/organization.service';
import { TranslationTextService } from '../../../services/translation-text.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseComponent implements OnInit {
  memberKey: string;
  paymentKey: string;
  member: MemberPublic;
  momentsPast: MomentList[];
  momentsFuture: MomentList[];

  constructor(protected route: ActivatedRoute,
    protected organizationService: OrganizationService,
    protected translationTextService: TranslationTextService,
    private memberService: MemberService,
    private momentService: MomentService,

  ) {

    super("MEMBERMONEY", route, organizationService, translationTextService, CustomEntityEnum.Persoon);

  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.memberKey = params.get('memberKey');
      this.language = params.get('language');
      this.paymentKey = params.get('paymentKey');


      this.memberService.getByKey(this.memberKey, this.accessKey).subscribe(result => {
        this.member = result;
        this.person = this.member.Person;
        this.init();

      });

      this.momentService.GetAllFutureByMember(this.memberKey, this.accessKey).subscribe(result => {
        this.momentsFuture = result;
      });

      this.momentService.GetAllPastByMember(this.memberKey, this.accessKey).subscribe(result => {
        this.momentsPast = result;
      });

  });

}

}
