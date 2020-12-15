import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceDataCompanyService } from 'app/services/service-data-company.service';
import { EventsServiceService } from '../../services/events-service.service';
import { Serviecokie } from '../../library/servercokie';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss']
})
export class MenuHomeComponent implements OnInit {
  loginForm = false;
  form_login: FormGroup;
  alert_ = false;
  guardacontra = true;
  constructor(
    private http_service: EventsServiceService,
    private formBuilder: FormBuilder,
    private http: ServiceDataCompanyService,
    private route: Router,
    private serviceCokie: Serviecokie
  ) {
    this.form_login = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      guarda: [false]
    });
   }

  ngOnInit(): void {
    this.http_service.preloadEvent$.emit(false);
    if (this.serviceCokie.getCokie('dataAcces')) {
      const dataAcess = this.serviceCokie.getCokie('dataAcces');
      this.form_login.controls['user'].setValue(dataAcess['user']);
      this.form_login.controls['password'].setValue( dataAcess['password']);
      this.form_login.controls['guarda'].setValue(dataAcess['guarda']);
    }
  }
  login() {
    if (this.form_login.valid) {
      this.http.service_login(this.form_login.value)
        .subscribe(data => {
          const expiredDate = new Date();
          expiredDate.setDate(expiredDate.getDate() + 1);
          console.log(data);
          if (data['response']['ok'] !== 'Error') {
            if (this.form_login.controls['guarda']) {
              this.serviceCokie.setCookie('dataAcces', this.form_login.value);
            }
            this.loginForm = false;
            this.http_service.Cambio_menu$.emit(true);
            this.serviceCokie.setCookie('data_user', data['response']['datosusuario']);
            this.serviceCokie.setCookie('token', data['response']['Token']);
            this.serviceCokie.setCookie('data_company', data['response']['empresa']);
            this.ir('profile-company/resume/MA');
          } else {
            this.alert_ = true;
            setTimeout(() => {
              this.alert_ = false;
            }, 2000);
          }
         
        },
          error => {
            console.log(error);
          });
    } else {
      console.log(this.form_login.value);
      
    }

  }
  ir(ruta) {
    this.loginForm = false;
    this.route.navigateByUrl('/' + ruta);
  }

}
