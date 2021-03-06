import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssociationsRoutingModule } from './associations-routing.module';
import { CassociationsComponent } from './componets/cassociations/cassociations.component';
import { InputMaskModule } from 'primeng/inputmask';
import { CardsComponent } from './components/cards/cards.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CassociationsComponent, CardsComponent],
  imports: [
    CommonModule,
    AssociationsRoutingModule,
    InputMaskModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ]
})
export class AssociationsModule { }
