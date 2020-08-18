import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileUserRoutingModule } from './profile-user-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPasswordComponent } from './components/form-password/form-password.component';


@NgModule({
  declarations: [FormComponent, ListComponent, FormPasswordComponent],
  imports: [
    CommonModule,
    ProfileUserRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ProfileUserModule { }
