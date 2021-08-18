import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { SubscribeComponent } from './subscribe/subscribe.component';


const routes: Routes = [
  { path: '', component: ActivityComponent },
  { path: ':memberKey/subscribe', component: SubscribeComponent },
  { path: ':memberKey/subscribe/:type', component: SubscribeComponent },
  { path: ':memberKey/paid/:type/:paymentKey', component: SubscribeComponent },
  { path: ':memberKey/paid/:paymentKey', component: SubscribeComponent },


];

@NgModule({
  declarations: [ActivityComponent, SubscribeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ActivityModule { }
