import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonFormFieldList } from '../../../models/Person/person-form-field';

@Component({
  selector: 'app-person-custom-field',
  templateUrl: './person-custom-field.component.html',
  styleUrls: ['./person-custom-field.component.scss']
})
export class PersonCustomFieldComponent implements OnInit {
  @Input() field: PersonFormFieldList;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
