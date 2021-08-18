import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BaseService } from '../services/base.service';

import { LayoutModule } from './layout/layout.module';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { CurrencyFormatPipe } from './_pipes/currency-format.pipe';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/nl-BE';
registerLocaleData(locale);

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import {FormlyHorizontalWrapper} from './formly/horizontal-wrapper';
import {BaseComponent} from './base/base.component';
import {TitleWrapper} from './formly/title-wrapper';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FormlyHorizontalWrapper,
    BaseComponent,
    TitleWrapper
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([], { paramsInheritanceStrategy: 'always', relativeLinkResolution: 'legacy' }),
    LayoutModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'nl-BE' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
