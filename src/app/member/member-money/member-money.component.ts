import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { TranslationTextService } from '../../../services/translation-text.service';
import { CustomEntityEnum } from '../../../models/customEntity/custom-entity';
import { OrganizationService } from '../../../services/organization.service';
import { MemberService } from '../../../services/member.service';
import { MemberPublic } from '../../../models/member/member';

@Component({
  selector: 'app-member-money',
  templateUrl: './member-money.component.html',
  styleUrls: ['./member-money.component.scss']
})
export class MemberMoneyComponent extends BaseComponent implements OnInit {

  memberKey: string;
  paymentKey: string;
  member: MemberPublic;

  constructor(protected route: ActivatedRoute,
    protected organizationService: OrganizationService,
    protected translationTextService: TranslationTextService,
    private memberService: MemberService,

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

        if (this.member.Saldo < 0)
          this.member.Saldo *= -1;
      });

    });

  }


  pay() {
    this.memberService.pay(this.memberKey, this.accessKey, window.location.href).subscribe(result => {
      window.location.href = result;
    })
  }

}
