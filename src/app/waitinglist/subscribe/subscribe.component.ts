import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslationTextService } from '../../../services/translation-text.service';
import { ActivatedRoute } from '@angular/router';
import { TranslationTextBasic } from '../../../models/translation-text';
import { WaitingListMember } from '../../../models/member/waiting-list-member';
import { CustomEntityObjectService } from '../../../services/custom-entity-object.service';
import { CustomEntityEnum } from '../../../models/customEntity/custom-entity';
import { CustomEntityFieldList, CustomEntityField } from '../../../models/customEntity/custom-entity-field';
import { CustomEntityFieldService } from '../../../services/custom-entity-field.service';
import { OrganizationService } from '../../../services/organization.service';
import { OrganizationPublic } from '../../../models/organization';
import { WorkGroup, WaitingListMemberWorkgroup } from '../../../models/Person/workgroup';
import { MemberTeamService } from '../../../services/member-team.service';
import { MemberTeamName, MemberTeam } from '../../../models/member/member-team';
import { PersonXAddressList } from '../../../models/address';
import { WaitingListMemberService } from '../../../services/waiting-list-member.service';
import { CustomEntityFieldValueList } from '../../../models/customEntity/custom-entity-field-value';
import { partition } from 'rxjs';
import { WorkgroupService } from '../../../services/workgroup.service';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})

export class SubscribeComponent implements OnInit {

  step = 1;
  subscriptionType = "self";
  accessKey: string;
  language: string;
  organization: OrganizationPublic;
  translations: TranslationTextBasic[];
  entityTranslations: TranslationTextBasic[];
  waitingListMember: WaitingListMember;
  fields: CustomEntityFieldList[];
  allValidatorsVisible = false;
  isSaving = false;
  isVolunteer = false;
  fieldsAlreadyShown = [1, 2, 4, 5, 7, 8, 11, 14, 16]
  thankYouTitle = "";
  thankYouContent = "";
  introTitle = "";
  introContent = "";
  teamName: MemberTeamName;
  memberTeams: MemberTeam[];
  workgroups: WorkGroup[];
  defaulttext: string = "Wij gebruiken <a href='https://assistonline.eu' target='_blank'>Assist</a> om onze persoonsgegevens te beheren. "



  constructor(
    private route: ActivatedRoute,
    private translationTextService: TranslationTextService,
    private customobjectService: CustomEntityObjectService,
    private customEntityFieldService: CustomEntityFieldService,
    private organizationService: OrganizationService,
    private memberTeamService: MemberTeamService,
    private workgroupServiceService: WorkgroupService,
    private waitinglistMemberService: WaitingListMemberService) {

  }



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.language = params.get('language');
      this.isVolunteer = params.get('type') != null && params.get('type').toLowerCase() == 'volunteer';

      this.translationTextService.getAllByEntity(CustomEntityEnum.Persoon, this.accessKey).subscribe(result => {
        this.entityTranslations = result;
      });
      this.translationTextService.getAllByPage("WAITINGLIST", this.accessKey).subscribe(result => {
        this.translations = result;
      });
      this.customobjectService.create(CustomEntityEnum.Persoon, this.accessKey).subscribe(result => {
        if (!this.waitingListMember)
          this.waitingListMember = new WaitingListMember();
        if (this.waitingListMember.Person.PersonXAddresses.length == 0) {
          this.waitingListMember.Person.PersonXAddresses = [new PersonXAddressList()]
        }
        this.waitingListMember.Person.CustomEntityObject = result;


      });
      this.organizationService.getByKey(this.accessKey).subscribe(result => {
        this.organization = result;
      });
      this.customEntityFieldService.getAllByEntity(1, this.accessKey).subscribe(result => {
        this.fields = result;
      });

      if (this.isVolunteer) {
        this.workgroupServiceService.getForWaitinglist(this.accessKey).subscribe(data => {
          this.workgroups = data;
        });
      } else {
        this.memberTeamService.getTeamNames(this.accessKey).subscribe(data => {
          this.teamName = data;
        });
      }



      this.memberTeamService.getAllForWaitingList(this.accessKey).subscribe(data => {
        this.memberTeams = data;
      })

      this.waitinglistMemberService.getWaitingListIntroPageContent(this.accessKey).subscribe(content => {
        this.introTitle = content.Title;
        this.introContent = content.Content;
      })
    });
  }

  translateDefaultField(defaultFieldId: number): string {
    return this.translateField(this.getDefaultField(defaultFieldId));
  }


  translateField(field: CustomEntityFieldList): string {
    let translation = "";
    if (this.language && field && this.entityTranslations) {
      translation = this.getFieldTranslation(this.language, field, this.entityTranslations);
      if (translation)
        return translation;
    }
    return this.replaceDefaultTags(field.Name);
  }

  getFieldTranslation(language: string, field: CustomEntityFieldList, translations: TranslationTextBasic[]) {
    let translationText = "";
    translations.forEach(function (translation, i) {
      if (translation.Language.Code == language) {
        if (field.CustomEntityDefaultFieldId != null && translation.CustomEntityDefaultFieldId == field.CustomEntityDefaultFieldId) {
          translationText = translation.Translation;
        }
        if (field.CustomEntityDefaultFieldId == null && translation.CustomEntityFieldId == field.Id) {
          translationText = translation.Translation;
        }
      }
    });
    if (translationText == "")
      translationText = field.Name;
    return this.replaceDefaultTags(translationText);
  }

  translate(keyword: string, language?: string): string {
    let translationText: string = keyword;
    if (this.translations) {
      if (!language)
        language = this.language;
      this.translations.forEach(function (translation, i) {
        if (translation.Language.Code == language && translation.Keyword.toLowerCase() == keyword.toLowerCase())
          translationText = translation.Translation;
      })
    }
    return this.replaceDefaultTags(translationText);
  }


  replaceDefaultTags(text: string): string {
    if (text && text.indexOf('[') > -1) {
      if (this.organization) {
        text = text.replace("[ORGANIZATION_NAME]", this.organization.Name);
        text = text.replace("[ORGANIZATION_SHORT]", this.organization.Short ? this.organization.Short : this.organization.Name);
      }
      if (this.waitingListMember && this.waitingListMember.Person) {
        text = text.replace("[PERSON_FIRSTNAME]", this.waitingListMember.Person.FirstName);
        text = text.replace("[PERSON_LASTNAME]", this.waitingListMember.Person.LastName);
      }
      if (this.teamName) {
        text = text.replace("[TEAMNAME]", this.translate(this.teamName.Name));
        text = text.replace("[TEAMNAME-LOWER]", this.translate(this.teamName.Name.toLowerCase()));
        text = text.replace("[TEAMNAMEPLURAL]", this.translate(this.teamName.NamePlural));
        text = text.replace("[TEAMNAMEPLURAL-LOWER]", this.translate(this.teamName.NamePlural.toLowerCase()));
      }
    }
    return text;
  }

  getDefaultField(defaultFieldId: number): CustomEntityFieldList {
    let returnField: CustomEntityFieldList
    this.fields.forEach(function (field, i) {
      if (field.CustomEntityDefaultFieldId == defaultFieldId)
        returnField = field;
    });
    return returnField;
  }

  getFieldValue(field: CustomEntityFieldList): CustomEntityFieldValueList {
    const values = this.waitingListMember.Person.CustomEntityObject.CustomEntityFieldValues
    for (let i = 0; i < values.length; i++) {
      if (values[i].CustomEntityFieldId == field.Id) {
        return values[i];
      }
    }
  }

  log(item) {
    console.log(item);
  }




  needToShow(field: CustomEntityFieldList) {
    if (field.CustomEntityDefaultFieldId != null && this.fieldsAlreadyShown.indexOf(field.CustomEntityDefaultFieldId) > -1) {
      return false;
    } else {
      return field.ShowWaitinglist;
    }
  }

  hasFields(fields: CustomEntityFieldList[], partId: number) {
    for (var i = 0; i < fields.length; i++) {
      if (this.needToShow(fields[i]) && fields[i].CustomEntityPartId == partId)
        return true;
    }
    return false;
  }

  addWorkgroup(workgroupId: number) {
    let workgroup: WorkGroup;
    if (workgroupId) {
      if (!this.waitingListMember.WaitingListMemberWorkgroups) {
        this.waitingListMember.WaitingListMemberWorkgroups = [];
      }
      for (var i = 0; i < this.workgroups.length; i++) {
        if (this.workgroups[i].Id == workgroupId)
          workgroup = this.workgroups[i];
      }
      if (workgroup)
        this.waitingListMember.WaitingListMemberWorkgroups.push({
          Id: 0,
          ListOrder: this.waitingListMember.WaitingListMemberWorkgroups.length + 1,
          WorkgroupId: workgroup.Id,
          WaitingListMemberId: 0,
          Workgroup: workgroup,
        })
    }
  }

  deleteWorkgroup(workgroup: WaitingListMemberWorkgroup) {
    for (var i = 0; i < this.waitingListMember.WaitingListMemberWorkgroups.length; i++) {
      if (this.waitingListMember.WaitingListMemberWorkgroups[i].Workgroup.Id == workgroup.Workgroup.Id)
        this.waitingListMember.WaitingListMemberWorkgroups.splice(i, 1);
    }
  }

  hasWorkgroup(workgroupId: number): boolean {
    for (var i = 0; i < this.workgroups.length; i++) {
      if (this.workgroups[i].Id == workgroupId)
        return true;
    }
    return false;
  }


  onSubmit(frm) {
    if (this.step < 4) {
      this.next(frm);
    } else {
      if (frm.valid) {
        this.isSaving = true;
        if (this.waitingListMember.Person.BirthDate) {
          var dateArr = this.waitingListMember.Person.BirthDate.toString().split('/');
          this.waitingListMember.Person.BirthDate = new Date(dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0])
        }
        this.waitingListMember.IsVolunteer = this.isVolunteer;
        this.waitinglistMemberService.save(this.waitingListMember, this.accessKey).subscribe(data => {
          console.log(data)
          if (data) {
            this.waitinglistMemberService.getWaitingListThankYouPageContent(this.accessKey).subscribe(content => {
              this.thankYouTitle = content.Title.replace(/{lid-familienaam}/gi, this.waitingListMember.Person.LastName).replace(/{lid-voornaam}/gi, this.waitingListMember.Person.FirstName);
              this.thankYouContent = content.Content.replace(/{lid-familienaam}/gi, this.waitingListMember.Person.LastName).replace(/{lid-voornaam}/gi, this.waitingListMember.Person.FirstName);

              this.step++;
              this.isSaving = false;
            });

          }
        }, error => {
          console.log("error:" + error)
          if (error) {
            alert("error")
          }
        });
      } else {
        this.allValidatorsVisible = true;
      }
    }

  }

  next(frm) {
    if (frm.valid) {
      this.step++;
      this.allValidatorsVisible = false;
    } else
      this.allValidatorsVisible = true;
  }

  previous() {
    this.step--;
  }


  reset() {
    this.customobjectService.create(CustomEntityEnum.Persoon, this.accessKey).subscribe(result => {
      this.waitingListMember = new WaitingListMember();
      this.waitingListMember.Person.PersonXAddresses = [new PersonXAddressList()]
      this.waitingListMember.Person.CustomEntityObject = result;
    }
    );
    this.step = 1;
    this.allValidatorsVisible = false;
  }

}

export enum SubscriptionTypeEnum {
  Self = 1,
  Child,
  Other
}

