import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsAndServicesRoutingModule } from './products-and-services-routing.module';
import {FormComponent} from './components/form/form.component';
import { CardsComponent } from './components/cards/cards.component';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormComponent, CardsComponent],
  imports: [
    CommonModule,
    ProductsAndServicesRoutingModule,
    InputMaskModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsAndServicesModule { }
