import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MarcasRoutingModule } from './marcas-routing.module';
import { FormComponent } from './components/form/form.component';
import { CardsComponent } from './components/cards/cards.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FormComponent, CardsComponent],
  imports: [
    CommonModule,
    MarcasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MarcasModule { }
