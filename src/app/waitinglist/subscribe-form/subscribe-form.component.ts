import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonXAddressList } from '../../../models/address';
import { CustomEntityEnum } from '../../../models/customEntity/custom-entity';
import { CustomEntityFieldTypeEnum } from '../../../models/customEntity/custom-entity-field-type';
import { MemberTeam, MemberTeamName } from '../../../models/member/member-team';
import { WaitingListMember } from '../../../models/member/waiting-list-member';
import { PersonForm } from '../../../models/Person/person-form';
import { PersonFormFieldList } from '../../../models/Person/person-form-field';
import { WorkGroup } from '../../../models/Person/workgroup';
import { TranslationTextBasic } from '../../../models/translation-text';
import { CustomEntityObjectService } from '../../../services/custom-entity-object.service';
import { MemberTeamService } from '../../../services/member-team.service';
import { OrganizationService } from '../../../services/organization.service';
import { PersonFormService } from '../../../services/person-form.service';
import { TranslationTextService } from '../../../services/translation-text.service';
import { WaitingListMemberService } from '../../../services/waiting-list-member.service';
import { WorkgroupService } from '../../../services/workgroup.service';


@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  styleUrls: ['./subscribe-form.component.scss']
})
export class SubscribeFormComponent implements OnInit {
  accessKey: string;
  language: string;
  formKey: string;
  success: string;
  translations: TranslationTextBasic[];
  entityTranslations: TranslationTextBasic[];

  waitingListMember: WaitingListMember;
  personForm: PersonForm;
  teamName: MemberTeamName;
  memberTeams: MemberTeam[];
  workgroups: WorkGroup[];
  fields: PersonFormFieldList[];

  form: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private translationTextService: TranslationTextService,
    private customobjectService: CustomEntityObjectService,
    private personFormService: PersonFormService,
    private memberTeamService: MemberTeamService,
    private workgroupServiceService: WorkgroupService,
    private waitinglistMemberService: WaitingListMemberService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.language = params.get('language');
      this.formKey = params.get('formKey');
    });

    

  }

}
