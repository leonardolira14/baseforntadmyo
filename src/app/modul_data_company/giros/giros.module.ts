import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GirosRoutingModule } from './giros-routing.module';
import { CardsComponent } from './components/cards/cards.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CardsComponent, FormComponent],
  imports: [
    CommonModule,
    GirosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GirosModule { }
