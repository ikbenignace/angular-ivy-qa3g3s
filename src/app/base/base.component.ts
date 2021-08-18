import {Component, Inject, OnInit} from '@angular/core';
import { TranslationTextBasic } from '../../models/translation-text';
import { TranslationTextService } from '../../services/translation-text.service';
import { CustomEntityEnum } from '../../models/customEntity/custom-entity';
import { ActivatedRoute } from '@angular/router';
import { OrganizationPublic } from '../../models/organization';
import { MemberTeamName } from '../../models/member/member-team';
import { PersonList, Person } from '../../models/Person/person';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-base',
  template: 'base',
  styleUrls: []
})
export class BaseComponent implements OnInit {
  accessKey: string;
  language: string;
  translations: TranslationTextBasic[];
  entityTranslations: TranslationTextBasic[];

  organization: OrganizationPublic;
  teamName: MemberTeamName;
  person: Person;


  constructor(
    @Inject('page') protected page: string,
    protected route: ActivatedRoute,
    protected organizationService: OrganizationService,
    protected translationTextService: TranslationTextService,
    @Inject('entity') protected entity?: number
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.language = params.get('language');
      this.init();

    });


  }

  init() {

    if (this.entity) {
      this.translationTextService.getAllByEntity(this.entity, this.accessKey).subscribe(result => {
        this.entityTranslations = result;
      });
    }

    this.organizationService.getByKey(this.accessKey).subscribe(result => {
      this.organization = result;
    });
    if (this.page)
      this.translationTextService.getAllByPage(this.page, this.accessKey).subscribe(result => {
        this.translations = result;
      });
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
      if (this.person) {
        text = text.replace("[PERSON_FIRSTNAME]", this.person.FirstName);
        text = text.replace("[PERSON_LASTNAME]", this.person.LastName);
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

}
