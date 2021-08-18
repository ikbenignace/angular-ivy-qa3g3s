import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'horizontal-wrapper',
  template: `
    <div class="form-group row mb-3">
      <label [attr.for]="id" class="col-xs-12 col-sm-4 col-md-4" *ngIf="to.label">
        {{ to.label }}
        <ng-container *ngIf="to.required && to.hideRequiredMarker !== true">*</ng-container>
      </label>
      <div class="col-xs-11 col-sm-7 col-md-7">
        <ng-template #fieldComponent></ng-template>
      </div>
    </div>
  `,
})
export class FormlyHorizontalWrapper extends FieldWrapper {
}
