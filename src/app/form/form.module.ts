import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentComponent } from './document/document.component';
import { QuestionComponent } from './question/question.component';
import { UploadComponent } from '../_components/upload/upload.component';


const routes: Routes = [
  { path: '', component: FormComponent },
  { path: ':formKey/:formId/document/:id', component: DocumentComponent },

];

@NgModule({
  declarations: [FormComponent,
    QuestionComponent,
    UploadComponent,
    DocumentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class FormModule { }
