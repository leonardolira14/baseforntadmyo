import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCompanyRoutingModule } from './profile-company-routing.module';
import { DataCompanyComponent } from './components/data-company/data-company.component';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [DataCompanyComponent],
  imports: [
    CommonModule,
    ProfileCompanyRoutingModule,
    InputMaskModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ProfileCompanyModule { }
