import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { ResumenComponent } from './pages/resumen/resumen.component';
import { BarralogoComponent } from './components/barralogo/barralogo.component';
import { MenuComponent } from './components/menu/menu.component';
import { ButtonssupComponent } from './components/buttonssup/buttonssup.component';
import { ImgcardsComponent } from './components/imgcards/imgcards.component';
import { RiesgocardsComponent } from './components/riesgocards/riesgocards.component';
import { CertificacionesComponent } from './pages/certificaciones/certificaciones.component';
import { CardcertificationComponent } from './components/cardcertification/cardcertification.component';
import { CardmarcaComponent } from './components/cardmarca/cardmarca.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { FollowComponent } from './pages/follow/follow.component';
import { CardfollowComponent } from './components/cardfollow/cardfollow.component';


@NgModule({
  declarations: [ResumenComponent, BarralogoComponent, MenuComponent, ButtonssupComponent, ImgcardsComponent, RiesgocardsComponent, CertificacionesComponent, CardcertificationComponent, CardmarcaComponent, MarcaComponent, FollowComponent, CardfollowComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
