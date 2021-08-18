import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivityBasic } from '../../../models/activity/activity';
import { PersonXAddressList } from '../../../models/address';
import { NamedOption } from '../../../models/common/named-option';
import { CustomEntityEnum } from '../../../models/customEntity/custom-entity';
import { CustomEntityFieldTypeEnum } from '../../../models/customEntity/custom-entity-field-type';
import { IsoCountry } from '../../../models/location/IsoCountry';
import { MemberTeam, MemberTeamName } from '../../../models/member/member-team';
import { WaitingListMember } from '../../../models/member/waiting-list-member';
import { OrganizationPublic } from '../../../models/organization';
import { PersonForm } from '../../../models/Person/person-form';
import { PersonFormFieldList } from '../../../models/Person/person-form-field';
import { WaitingListMemberWorkgroup, WorkGroup } from '../../../models/Person/workgroup';
import { TranslationTextBasic } from '../../../models/translation-text';
import { CountryService } from '../../../services/country.service';
import { CustomEntityObjectService } from '../../../services/custom-entity-object.service';
import { LocationService } from '../../../services/location.service';
import { MemberTeamService } from '../../../services/member-team.service';
import { OrganizationService } from '../../../services/organization.service';
import { PersonFormService } from '../../../services/person-form.service';
import { TranslationTextService } from '../../../services/translation-text.service';
import { WaitingListMemberService } from '../../../services/waiting-list-member.service';
import { WorkgroupService } from '../../../services/workgroup.service';
import { PersonDefaultFieldComponent } from '../person-default-field/person-default-field.component';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  @Input() accessKey: string;
  @Input() language: string;
  @Input() formKey: string;

  translations: TranslationTextBasic[];
  entityTranslations: TranslationTextBasic[];

  waitingListMember: WaitingListMember;
  personForm: PersonForm;
  teamName: MemberTeamName;
  memberTeams: MemberTeam[];
  workgroups: WorkGroup[];
  originalWorkgroups: WorkGroup[];
  fields: PersonFormFieldList[];
  organization: OrganizationPublic;
  form: FormGroup;
  isSaving: boolean;
  success = false;
  paymentSuccess: string;
  introTitle = "";
  introContent = "";
  thankYouTitle: string;
  thankYouContent: string
  step: number = 1;
  genderOptions: NamedOption[] = [{ Id: 1, Name: "Man" }, { Id: 2, Name: "Vrouw" }, { Id: 2, Name: "Ander" }];
  salutations: NamedOption[];
  nationalities: IsoCountry[];
  allValidatorsVisible = false;
  defaulttext: string = "Wij gebruiken <a href='https://assistonline.eu' target='_blank'>Assist</a> om onze persoonsgegevens te beheren. "
  datePlaceholder = "dd/mm/jjjj";


  constructor(
    private route: ActivatedRoute,
    private translationTextService: TranslationTextService,
    private customobjectService: CustomEntityObjectService,
    private personFormService: PersonFormService,
    private memberTeamService: MemberTeamService,
    private locationService: LocationService,
    private organizationService: OrganizationService,
    private workgroupService: WorkgroupService,
    private countryService: CountryService,
    private waitinglistMemberService: WaitingListMemberService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paymentSuccess = params['success'];


      this.organizationService.getByKey(this.accessKey).subscribe(result => {
        this.organization = result;
      });
      this.personFormService.getByKey(this.formKey, this.accessKey).subscribe(result => {
        this.personForm = result;
        this.fields = this.personForm.PersonFormFields.sort((a, b) => a.ListOrder - b.ListOrder);
        this.fieldsLoaded(this.fields);
      })

      this.translationTextService.getAllByEntity(CustomEntityEnum.Persoon, this.accessKey).subscribe(result => {
        this.entityTranslations = result;
      });
      this.translationTextService.getAllByPage("WAITINGLIST", this.accessKey).subscribe(result => {
        this.translations = result;
      });

      this.waitinglistMemberService.getWaitingListIntroPageContent(this.accessKey).subscribe(content => {
        this.introTitle = content.Title;
        this.introContent = content.Content;
      })

      this.countryService.getAllPublic(this.language.toLowerCase() === "fr" ? "frans" : "name").subscribe(data => {
        this.nationalities = data;
      });

      if (this.paymentSuccess) {
        this.loadSuccess();
      } else {
        this.customobjectService.create(CustomEntityEnum.Persoon, this.accessKey).subscribe(result => {
          if (!this.waitingListMember)
            this.waitingListMember = new WaitingListMember();
          if (this.waitingListMember.Person.PersonXAddresses.length == 0) {
            this.waitingListMember.Person.PersonXAddresses = [new PersonXAddressList()]
          }
          this.waitingListMember.Person.CustomEntityObject = result;


        });

        this.memberTeamService.getTeamNames(this.accessKey).subscribe(data => {
          this.teamName = data;
        });
        this.memberTeamService.getAllForWaitingList(this.accessKey).subscribe(data => {
          this.memberTeams = data;
        })

        this.workgroupService.getForWaitinglist(this.accessKey).subscribe(data => {
          this.originalWorkgroups = [];
          for (var i = 0; i < data.length; i++) {
            if (!data[i].Children || data[i].Children.length == 0)
              this.originalWorkgroups.push(data[i]);
          }
          this.workgroups = this.originalWorkgroups;
        });

      }



    });

  }

  fieldsLoaded(fields: PersonFormFieldList[]) {
    let formPages = {};
    let formFields = {};
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (field.Show) {
        field.key = 'field' + field.Id;
        if (field.CustomEntityField.CustomEntityDefaultField && field.CustomEntityField.CustomEntityDefaultField.TypeName == "HomeAddress.PostCode") {
          formFields[field.key + 'pc'] = this.getFormControl(field);
          formFields[field.key + 'loc'] = this.getFormControl(field);
        } else
          formFields[field.key] = this.getFormControl(field);
      }
      if (field.CustomEntityField.CustomEntityDefaultField && field.CustomEntityField.CustomEntityDefaultField.TypeName == "Nationality.ISO") {
        formFields[field.key].setValue(24) //standaard op belgie zetten
      }
    }
    formPages['personData'] = new FormGroup(formFields);

    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (field.CustomEntityField.CustomEntityDefaultField && field.CustomEntityField.CustomEntityDefaultField.TypeName == "HomeAddress.PostCode") {
        formPages['personData'].get(field.key + 'pc').valueChanges.subscribe(value => {
          if (value.length >= 4)
            this.locationService.getlocationByPostcode(value).subscribe(data => {
              console.log(data);
              if (data) {
                formPages['personData'].get(field.key + 'loc').setValue(data.Gemeente);
                if (this.getFormControlByTypeName("HomeAddress.Province", this.getFormGroup('personData')))
                  this.getFormControlByTypeName("HomeAddress.Province", this.getFormGroup('personData')).setValue(data.Province.Name);
                if (this.getFormControlByTypeName("HomeAddress.Country", this.getFormGroup('personData')))
                  this.getFormControlByTypeName("HomeAddress.Country", this.getFormGroup('personData')).setValue(data.Country.Name);
                //focus op het volgende element na postcode en locatie leggen
                var j = i;
                while (fields[j].CustomEntityField.CustomEntityDefaultField && fields[j].CustomEntityField.CustomEntityDefaultField.TypeName.indexOf("HomeAddress.") > -1) {
                  j++;
                }
                document.getElementById(fields[j].key).focus();
              }
            })


          for (let j = i; j < fields.length; j++) {
            if (field.CustomEntityField.CustomEntityDefaultField && field.CustomEntityField.CustomEntityDefaultField.TypeName == "HomeAddress.PostCode")
              fields[j]
          }
        });
      }
    }


    /*MemberteamFields*/
    let teamFields = {};
    if (this.personForm.UseMemberTeams) {
      let validators = [];
      if (this.personForm.MemberTeamRequired)
        teamFields["MemberTeam"] = new FormControl("", { validators: Validators.required });
      else
        teamFields["MemberTeam"] = new FormControl("");
    }
    if (this.personForm.UseWorkgroups) {
      let validators = [];
      if (this.personForm.WorkgroupRequired)
        teamFields["Workgroup"] = new FormControl("");
      else
        teamFields["Workgroup"] = new FormControl("");

      teamFields["Workgroup"].valueChanges.subscribe(selectedValue => {
        console.log(selectedValue)
        if (selectedValue) {
          if (!this.waitingListMember.WaitingListMemberWorkgroups)
            this.waitingListMember.WaitingListMemberWorkgroups = [];
          for (var i = 0; i < this.workgroups.length; i++) {
            if (this.workgroups[i].Id == selectedValue) {
              this.waitingListMember.WaitingListMemberWorkgroups.push(
                {
                  Id: 0,
                  ListOrder: this.waitingListMember.WaitingListMemberWorkgroups.length + 1,
                  WorkgroupId: this.workgroups[i].Id,
                  WaitingListMemberId: 0,
                  Workgroup: this.workgroups[i],
                });
            }
          }
          this.removeChosenWorkgroups();
          this.form.get("teamData").get("Workgroup").setValue("");
        }
      })
    }

    teamFields["privacy"] = new FormControl("", { validators: Validators.required });
    teamFields["commercial"] = new FormControl("");
    formPages['teamData'] = new FormGroup(teamFields);
    /*WorkgroupFields*/
    /*productFields*/




    this.form = new FormGroup(formPages);


  }

  getFormControl(field: PersonFormFieldList): FormControl {
    let validators = [];
    var value = '';
    if (field.Required)
      validators.push(Validators.required);
    if (field.CustomEntityField.CustomEntityFieldType.HasOptions)
      value = "";

    if (field.CustomEntityField.CustomEntityFieldType.ValidationPattern) {
      validators.push(Validators.pattern(field.CustomEntityField.CustomEntityFieldType.ValidationPattern));
    } else {
      switch (field.CustomEntityField.CustomEntityFieldTypeId) {
        case 7://email

          validators.push(Validators.email);
          break;
        default:
      }
    }



    return new FormControl(value, { validators: Validators.compose(validators) });
  }


  setValueInWaitinglist(form: FormGroup, fields: PersonFormFieldList[], waitingListMember: WaitingListMember) {
    var persondata = form.get("personData");
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].CustomEntityField.CustomEntityDefaultField) { //standaard velden persoon
        if (fields[i].CustomEntityField.CustomEntityDefaultField.TypeName) {
          if (fields[i].CustomEntityField.CustomEntityDefaultField.TypeName.includes(".")) {
            if (fields[i].CustomEntityField.CustomEntityDefaultField.TypeName.includes("HomeAddress")) {
              let typeName = fields[i].CustomEntityField.CustomEntityDefaultField.TypeName.replace("HomeAddress.", "");
              if (typeName == "PostCode") {
                waitingListMember.Person.PersonXAddresses[0].Address.PostCode = persondata.get(fields[i].key + 'pc').value;
                waitingListMember.Person.PersonXAddresses[0].Address.Location = persondata.get(fields[i].key + 'loc').value;

              } else {
                waitingListMember.Person.PersonXAddresses[0].Address[typeName] = persondata.get(fields[i].key).value;
              }
            }
            if (fields[i].CustomEntityField.CustomEntityDefaultField.TypeName.includes("Nationality")) {
              waitingListMember.Person.NationalityId = persondata.get(fields[i].key).value;
            }
          } else {
            waitingListMember.Person[fields[i].CustomEntityField.CustomEntityDefaultField.TypeName] = persondata.get(fields[i].key).value;
          }
        }
      } else { //custom entityvelden
        for (var j = 0; j < this.waitingListMember.Person.CustomEntityObject.CustomEntityFieldValues.length; j++) {
          if (this.waitingListMember.Person.CustomEntityObject.CustomEntityFieldValues[j].CustomEntityFieldId == fields[i].CustomEntityFieldId) {
            if (fields[i].CustomEntityField.CustomEntityFieldType.HasOptions)
              this.waitingListMember.Person.CustomEntityObject.CustomEntityFieldValues[j].OptionId = persondata.get(fields[i].key).value;
            else {
              this.waitingListMember.Person.CustomEntityObject.CustomEntityFieldValues[j].Value = persondata.get(fields[i].key).value;
            }
          }
        }
      }

    }
    if (this.personForm.UseMemberTeams) {
      var teamData = form.get("teamData");
      this.waitingListMember.TeamId = teamData.get("MemberTeam").value;
      this.waitingListMember.Person.CanSendCommercial = teamData.get("commercial").value
    }
  }


  submit(form: FormGroup) {
    if (form.valid) {
      this.allValidatorsVisible = false;
      if (this.hasNextStep()) {
        this.step++;
      } else {
        this.isSaving = true;
        this.setValueInWaitinglist(this.form, this.fields, this.waitingListMember)
        //if (this.waitingListMember.Person.BirthDate) {
        //  var dateArr = this.waitingListMember.Person.BirthDate.toString().split('/');
        //  this.waitingListMember.Person.BirthDate = new Date(dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0])
        //}
        this.waitingListMember.IsVolunteer = this.personForm.ConvertToPerson;
        console.log(this.waitingListMember)
        this.waitinglistMemberService.saveWithPersonForm(this.waitingListMember, this.accessKey, this.formKey).subscribe(data => {
          console.log(data)
          if (data.paymentUrl) {
            window.location.href = data.paymentUrl;
          } else {
            this.loadSuccess();
            this.paymentSuccess = 'true'
          }
        }, error => {
          console.log("error:" + error)
          if (error) {
            alert("error")
          }
        });
      }
    } else {
      this.allValidatorsVisible = true;
    }

  }
  deleteWorkgroup(workgroup: WaitingListMemberWorkgroup) {
    for (var i = 0; i < this.waitingListMember.WaitingListMemberWorkgroups.length; i++) {
      if (this.waitingListMember.WaitingListMemberWorkgroups[i].Workgroup.Id == workgroup.Workgroup.Id)
        this.waitingListMember.WaitingListMemberWorkgroups.splice(i, 1);
    }
    this.removeChosenWorkgroups();

  }

  removeChosenWorkgroups() {
    //for (var i = 0; i < this.originalWorkgroups.length; i++) {
    //  var exists = false;
    //  this.workgroups = [];
    //  for (var j = 0; j < this.waitingListMember.WaitingListMemberWorkgroups.length; j++) {
    //    if (this.waitingListMember.WaitingListMemberWorkgroups[j].WorkgroupId == this.originalWorkgroups[i].Id)
    //      exists = true;
    //  }
    //  if (!exists)
    //    this.workgroups.push(this.originalWorkgroups[i]);
    //}
  }

  previous() {
    this.step--;
  }

  hasNextStep() {
    return (this.personForm.UseMemberTeams || this.personForm.UseWorkgroups || this.personForm.UseProducts) && this.step < 2;
  }

  loadSuccess() {
    this.waitinglistMemberService.getWaitingListThankYouPageContent(this.accessKey).subscribe(content => {
      this.thankYouTitle = content.Title//.replace(/{lid-familienaam}/gi, this.waitingListMember.Person.LastName).replace(/{lid-voornaam}/gi, this.waitingListMember.Person.FirstName);
      this.thankYouContent = content.Content//.replace(/{lid-familienaam}/gi, this.waitingListMember.Person.LastName).replace(/{lid-voornaam}/gi, this.waitingListMember.Person.FirstName);

      this.success = true;
      this.step = 3;
      this.isSaving = false;
    });
  }

  getOptions(field: PersonFormFieldList) {
    if (field.CustomEntityField.CustomEntityFieldType.HasOptions) {
      if (field.CustomEntityField.CustomEntityDefaultFieldId) {
        switch (field.CustomEntityField.CustomEntityDefaultField.TypeName) {
          case "SalutationId":
            return this.salutations;
            break;
          case "GenderId":
            return this.genderOptions;
            break;
          case "Nationality.ISO":
            return this.nationalities;
            break;
          default:
        }
      } else {
        return field.CustomEntityField.CustomEntityOptions.sort((a, b) => a.ListOrder - b.ListOrder);
      }
    }
  }

  getFormControlByTypeName(typeName: string, form: FormGroup) {
    for (let i = 0; i < this.fields.length; i++) {
      let field = this.fields[i];
      if (field.CustomEntityField.CustomEntityDefaultField && field.CustomEntityField.CustomEntityDefaultField.TypeName == typeName) {
        return form.get(field.key);
      }

    }
  }
  getFormGroup(name): FormGroup {
    return this.form.get(name) as FormGroup;
  }


  translate(keyword: string, language?: string): string {
    let translationText: string = keyword;
    if (this.translations) {
      if (!language)
        language = this.language;
      this.translations.forEach(function (translation, i) {
        if (translation.Language.Code == language.toUpperCase() && translation.Keyword.toLowerCase() == keyword.toLowerCase())
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

  reset() {
    if (window.location.href.indexOf('?') > -1)
      window.location.href = window.location.href.substring(0, window.location.href.indexOf('?'));
    else
      window.location.reload();
  }

}
