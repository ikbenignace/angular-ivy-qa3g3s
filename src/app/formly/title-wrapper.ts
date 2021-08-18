import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'title-wrapper',
  template: `
    <h3>{{ to.label }}</h3>
  `,
})
export class TitleWrapper extends FieldWrapper {
}
