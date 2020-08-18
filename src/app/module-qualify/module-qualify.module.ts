import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleQualifyRoutingModule } from './module-qualify-routing.module';
import { FormComponent } from './components/form/form.component';
import { QuestionaryComponent } from './components/questionary/questionary.component';
import { QualifyComponent } from './pages/qualify/qualify.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  declarations: [FormComponent, QuestionaryComponent, QualifyComponent],
  imports: [
    CommonModule,
    ModuleQualifyRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule,
    MatAutocompleteModule
  ],
  providers: [
    MatDatepickerModule
  ],
})
export class ModuleQualifyModule { }
