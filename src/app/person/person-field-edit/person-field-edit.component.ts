import { Component, OnInit, Input } from '@angular/core';
import { CustomEntityFieldList } from '../../../models/customEntity/custom-entity-field';
import { Person } from '../../../models/Person/person';
import { CustomEntityFieldValueList } from '../../../models/customEntity/custom-entity-field-value';
import { CountryService } from '../../../services/country.service';
import { IsoCountry } from '../../../models/location/IsoCountry';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-person-field-edit',
  templateUrl: './person-field-edit.component.html',
  styleUrls: ['./person-field-edit.component.scss']
})
export class PersonFieldEditComponent implements OnInit {
  @Input() fieldname: string;
  @Input() requiredtext: string;
  @Input() required: boolean;
  @Input() allValidatorsVisible: boolean;
  @Input() field: CustomEntityFieldList;
  @Input() person: Person;
  @Input() language: string;

  nationalities: IsoCountry[];

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    if (this.field.CustomEntityDefaultFieldId == 18) {
      this.countryService.getAllPublic(this.language.toLowerCase() === "fr" ? "frans" : "name").subscribe(data => {
        this.nationalities = data;
      });
    }


  }

  getFieldValue(field: CustomEntityFieldList): CustomEntityFieldValueList {
    const values = this.person.CustomEntityObject.CustomEntityFieldValues
    for (let i = 0; i < values.length; i++) {
      if (values[i].CustomEntityFieldId == field.Id) {
        return values[i];
      }
    }
  }

}
