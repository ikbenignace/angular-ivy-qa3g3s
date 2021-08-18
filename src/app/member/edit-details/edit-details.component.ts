import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../services/organization.service';
import {TranslationTextService} from '../../../services/translation-text.service';
import {MemberService} from '../../../services/member.service';
import {CustomEntity, CustomEntityEnum, CustomEntityList} from '../../../models/customEntity/custom-entity';
import {BaseComponent} from '../../base/base.component';
import {MemberPublic} from '../../../models/member/member';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Disabilities, Disability} from '../../../models/disability';
import {DisabilityService} from '../../../services/disability.service';
import {CustomEntityObjectService} from '../../../services/custom-entity-object.service';
import {CustomEntityFieldService} from '../../../services/custom-entity-field.service';
import {StartSettingsService} from '../../../services/start-settings.service';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {CustomEntityService} from '../../../services/custom-entity.service';
import {CustomEntityField, CustomEntityFieldList} from '../../../models/customEntity/custom-entity-field';
import {map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent extends BaseComponent implements OnInit {
  memberKey: string;
  paymentKey: string;
  member: MemberPublic;
  disabilities: Disabilities[];
  done: Boolean = false;

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];

  constructor(protected route: ActivatedRoute,
              protected organizationService: OrganizationService,
              protected translationTextService: TranslationTextService,
              private memberService: MemberService,
              private fb: FormBuilder,
              private disabilityService: DisabilityService,
              private customObjectService: CustomEntityObjectService,
              private customEntityFieldService: CustomEntityFieldService,
              private customEntityService: CustomEntityService,
              private startSettingsService: StartSettingsService
  ) {

    super('MEMBERMONEY', route, organizationService, translationTextService, CustomEntityEnum.Persoon);

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.memberKey = params.get('memberKey');
      this.language = params.get('language');
      this.paymentKey = params.get('paymentKey');

      this.memberService.getByKey(this.memberKey, this.accessKey).subscribe(
        result => {
          this.member = result;
          this.person = this.member.Person;
        }
      );

      this.memberService.getByKey(this.memberKey, this.accessKey).pipe(
        tap(v => console.log('getbykey', v)),
        mergeMap(member => this.customEntityService.getPublic(1, this.accessKey).pipe(
          tap(v => console.log('getbykey', v)),
          map(entity => {
            entity.CustomEntityParts.forEach(part => {
              this.fields.push(this.title(part.Name));
              member.Person.CustomEntityObject.CustomEntityFieldValues.forEach(value => {
                if (value.CustomEntityField.CustomEntityDefaultField != null && value.CustomEntityField.ShowPublic && value.CustomEntityField.CustomEntityPartId == part.Id && value.CustomEntityField.CustomEntityDefaultField.TypeName != null) {
                  this.fields.push(this.getControl(value.CustomEntityField));
                }
              });
            });
          })
        ))
      ).subscribe(v => console.log('results', v));

    });
  }

  onSubmit(): void {
    console.log(this.model);
    console.log(this.form);
  }

  title(title: string) {
    let item: FormlyFieldConfig = {
      wrappers: ['title'],
      templateOptions: {
        label: title
      }
    };
    return item;
  }

  getControl(field: CustomEntityFieldList) {
    let item: FormlyFieldConfig = {
      key: field.CustomEntityDefaultField.TypeName,
      wrappers: ['form-field-horizontal'],
      type: 'input',
      templateOptions: {
        label: field.CustomEntityDefaultField.Name,
        required: field.RequiredPublic
      }
    };
    console.log(item);
    return item;
  }

  loadForm() {
    this.customEntityService.getPublic(1, this.accessKey).subscribe(entity => {
      entity.CustomEntityParts.forEach(part => {
        this.fields.push(this.title(part.Name));

        //Here I use this.person to loop over the data
        this.person.CustomEntityObject.CustomEntityFieldValues.forEach(value => {
          if (value.CustomEntityField.CustomEntityDefaultField != null && value.CustomEntityField.ShowPublic && value.CustomEntityField.CustomEntityPartId == part.Id && value.CustomEntityField.CustomEntityDefaultField.TypeName != null) {
            this.fields.push(this.getControl(value.CustomEntityField));
          }
        });
      });
    });
  }
}
