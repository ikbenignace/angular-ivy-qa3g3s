import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WaitinglistComponent } from './waitinglist.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { CustomentityFieldRenderComponent } from '../customEntity/customentity-field-render/customentity-field-render.component';
import { PersonFieldEditComponent } from '../person/person-field-edit/person-field-edit.component';
import { TelephoneFormatDirective } from '../_directives/telephone-format.directive';
import { PostcodeDirective } from '../_directives/postcode.directive';
import { SubscribeFormComponent } from './subscribe-form/subscribe-form.component';
import { PersonFormComponent } from '../person/person-form/person-form.component';
import { PersonDefaultFieldComponent } from '../person/person-default-field/person-default-field.component';
import { PersonCustomFieldComponent } from '../person/person-custom-field/person-custom-field.component';


const routes: Routes = [
  { path: '', component: WaitinglistComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'subscribe/:type', component: SubscribeComponent },
  { path: 'add/:formKey', component: SubscribeFormComponent }
];

@NgModule({
  declarations: [WaitinglistComponent,
    SubscribeComponent,
    SubscribeFormComponent,
    CustomentityFieldRenderComponent,
    PersonFieldEditComponent,
    TelephoneFormatDirective,
    PostcodeDirective,
    PersonFormComponent,
    PersonDefaultFieldComponent,
    PersonCustomFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class WaitinglistModule { }
