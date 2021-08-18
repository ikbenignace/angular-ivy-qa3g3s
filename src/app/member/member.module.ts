import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberMoneyComponent } from './member-money/member-money.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CurrencyFormatPipe } from '../_pipes/currency-format.pipe';
import { CalendarComponent } from './calendar/calendar.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyHorizontalWrapper} from '../formly/horizontal-wrapper';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {TitleWrapper} from '../formly/title-wrapper';


const routes: Routes = [
  { path: '', component: MemberComponent },
  { path: ':memberKey/pay', component: MemberMoneyComponent },
  { path: ':memberKey/pay/:paymentKey', component: MemberMoneyComponent },
  { path: ':memberKey/calendar', component: CalendarComponent },
  { path: ':memberKey/edit', component: EditDetailsComponent }

];

@NgModule({
  declarations: [
    MemberComponent,
    MemberMoneyComponent,
    CurrencyFormatPipe,
    CalendarComponent,
    EditDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormlyModule.forRoot({
      wrappers: [
        {name: 'form-field-horizontal', component: FormlyHorizontalWrapper},
        {name: 'title', component: TitleWrapper}
      ]
    }),
    FormlyBootstrapModule
  ]
})
export class MemberModule { }
