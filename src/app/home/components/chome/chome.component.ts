import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceDataCompanyService } from '../../../services/service-data-company.service';
import { Router } from '@angular/router';
import { EventsServiceService } from '../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serviecokie } from '../../../library/servercokie';
@Component({
  selector: 'app-chome',
  templateUrl: './chome.component.html',
  styleUrls: ['./chome.component.scss']
})
export class ChomeComponent implements OnInit {
  form_login: FormGroup;
  public tarjetas = [
    {
      titulo: 'Gestiona tu imagen empresarial',
      icono: 'apartment'
    },
    {
      titulo: 'Gestiona tu riesgo empresarial',
      icono: 'admin_panel_settings'
    },
    {
      titulo: 'Seguimineto empresarial ',
      icono: 'search'
    },
    {
      titulo: 'Gestiona tu documentación',
      icono: 'thumb_up'
    },
    {
      titulo: 'Publicita tus productos',
      icono: 'insert_drive_file'
    },
    {
      titulo: 'Notificaciones de riesgo y calificaciones',
      icono: 'notification_important'
    }
  ];

  constructor(
    private http_service: EventsServiceService,
    private formBuilder: FormBuilder,
    private http: ServiceDataCompanyService,
    private route: Router,
    private serviceCokie: Serviecokie
  ) {
    this.form_login = this.formBuilder.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
    console.log(this.tarjetas);
   }

  ngOnInit(): void {
    this.http_service.preloadEvent$.emit(false);

  }
  login() {
    if (this.form_login.valid) { 
      this.http.service_login(this.form_login.value)
        .subscribe(data => {
          console.log(data);
          return;
          const expiredDate = new Date();
          expiredDate.setDate(expiredDate.getDate() + 1);
          console.log(data);
          this.serviceCokie.setCookie('data_user', data['response']['datosusuario']);
          this.serviceCokie.setCookie('token', data['response']['Token']);
          this.serviceCokie.setCookie('data_company', data['response']['empresa']);
          this.ir('profile-company/resume/MA');
        },
          error => {
            console.log(error);
          });
    } else {
      console.log(this.form_login.value);
    }
    
  }
  ir(ruta) {
    console.log(this.tarjetas);
    this.route.navigateByUrl('/' + ruta);
  }
  
}
