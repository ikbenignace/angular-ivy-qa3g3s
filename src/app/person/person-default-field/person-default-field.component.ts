import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonFormFieldList } from '../../../models/Person/person-form-field';

@Component({
  selector: 'app-person-default-field',
  templateUrl: './person-default-field.component.html',
  styleUrls: ['./person-default-field.component.scss']
})
export class PersonDefaultFieldComponent implements OnInit {
  @Input() field: PersonFormFieldList;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
