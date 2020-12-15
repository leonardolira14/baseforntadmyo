import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ChomeComponent } from './components/chome/chome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RegistroComponent } from './pages/registro/registro.component';
import { PreciosComponent } from './components/precios/precios.component';
import { ValidarComponent } from './pages/validar/validar.component';

@NgModule({
  declarations: [ChomeComponent, RegistroComponent, PreciosComponent, ValidarComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService
  ]
})
export class HomeModule { }
