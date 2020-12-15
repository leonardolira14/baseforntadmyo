import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuProfileComponent } from './shared/menu-profile/menu-profile.component';
import { MenuHomeComponent } from './shared/menu-home/menu-home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavSearchComponent } from './shared/nav-search/nav-search.component';
import { InputMaskModule } from 'primeng/inputmask';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFallimgModule } from 'ng-fallimg';
import { PreloadComponent } from './shared/preload/preload.component';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { AlertasComponent } from './shared/alertas/alertas.component';





export const DateFormats = {
  parse: {
    dateInput: ['YYYY-MM-DD']
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    MenuProfileComponent,
    MenuHomeComponent,
    FooterComponent,
    NavSearchComponent,
    PreloadComponent,
    AlertasComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    InputMaskModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgFallimgModule.forRoot({
      default: '/assets/img/foto-no-disponible.jpg'
    }),
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    CookieService,
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  exports: [
    InputMaskModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class AppModule { }
