import { Component, OnInit, Input } from '@angular/core';
import { CustomEntityFieldList } from '../../../models/customEntity/custom-entity-field';
import { CustomEntityFieldValueList } from '../../../models/customEntity/custom-entity-field-value';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-customentity-field-render',
  templateUrl: './customentity-field-render.component.html',
  styleUrls: ['./customentity-field-render.component.scss']

})
export class CustomentityFieldRenderComponent implements OnInit {

  @Input() fieldname: string;
  @Input() requiredtext: string;
  @Input() allValidatorsVisible: boolean;
  @Input() required: boolean;
  @Input() field: CustomEntityFieldList;
  @Input() value: CustomEntityFieldValueList;

  constructor() { }

  ngOnInit() {
    const pause = ""
  }

}
