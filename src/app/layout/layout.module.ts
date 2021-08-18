import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'https://app.assistonline.eu',
    pathMatch: 'full'
  },
  {
    path: ':language/:accessKey',
    component: PublicLayoutComponent,
    children: [
      { path: 'waitinglist', loadChildren: () => import('../waitinglist/waitinglist.module').then(m => m.WaitinglistModule) },
      { path: 'member', loadChildren: () => import('../member/member.module').then(m => m.MemberModule) },
      { path: 'form', loadChildren: () => import('../form/form.module').then(m => m.FormModule) },
      { path: 'activity', loadChildren: () => import('../activity/activity.module').then(m => m.ActivityModule) }
    ]
  }


];

@NgModule({
  declarations: [
    PublicLayoutComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
