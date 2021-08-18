import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActvityComponent } from './actvity.component';


const routes: Routes = [
  { path: '', component: ActvityComponent }
];

@NgModule({
  declarations: [ActvityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ActvityModule { }
