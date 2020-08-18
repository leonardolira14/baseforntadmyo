import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CertificationsRoutingModule } from './certifications-routing.module';
import { CcertificationsComponent } from './components/ccertifications/ccertifications.component';
import { CardsComponent } from './components/cards/cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CcertificationsComponent, CardsComponent],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CertificationsModule { }
