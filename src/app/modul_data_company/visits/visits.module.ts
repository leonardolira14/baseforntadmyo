import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitsRoutingModule } from './visits-routing.module';
import { FormComponent } from './components/form/form.component';
import { CardsComponent } from './components/cards/cards.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [FormComponent, CardsComponent],
  imports: [
    CommonModule,
    VisitsRoutingModule,
    NgbModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class VisitsModule { }
