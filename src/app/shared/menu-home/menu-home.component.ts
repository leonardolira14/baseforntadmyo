import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceDataCompanyService } from 'app/services/service-data-company.service';
import { EventsServiceService } from '../../services/events-service.service';
import { Serviecokie } from '../../library/servercokie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss']
})
export class MenuHomeComponent implements OnInit {
  loginForm = false;
  form_login: FormGroup;
  form_recuper: FormGroup;
  alert_ = false;
  recuperForm = false;
  guardacontra = true;
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
      guarda: [false]
    });
    this.form_recuper =  this.formBuilder.group({
      correo: ['',Validators.required]
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
          if (data['ok']) {
            if (this.form_login.controls['guarda']) {
              this.serviceCokie.setCookie('dataAcces', this.form_login.value);
            }
            this.loginForm = false;
            this.http_service.Cambio_menu$.emit(true);
            this.serviceCokie.setCookie('token',data['msg']);
            this.ir('profile-company/resume/MA');
          }
         
        },
          (error:HttpErrorResponse) => {
            if(error.status === 404){
              Swal.fire('Error',error.error['msg'],'error');
            }
            if(error.status === 500){
              Swal.fire('Error',error.error['msg'],'error');
            }
          });
    } else {
      if(!this.form_login.valid){
        Swal.fire('Error','Ingresa tu correo elctronico y contraseña','error');
      }
     
      
    }

  }
  ir(ruta) {
    this.loginForm = false;
    this.route.navigateByUrl('/' + ruta);
  }
  recuperar(){
    this.loginForm = false;
    this.recuperForm = true;
  }
  sendrecupera(){
    this.http_service.preloadEvent$.emit(true);
    if(this.form_recuper.valid){
      this.http.recuperar(this.form_recuper.value)
      .subscribe(data=>{
        this.http_service.preloadEvent$.emit(false);
        if(data['ok']){
          Swal.fire('Exito','Envio de instrucciones exitoso.','success');
        }

      },(error:HttpErrorResponse)=>{
        this.http_service.preloadEvent$.emit(false);
        if(error.status === 500){
          Swal.fire('Error','Error interno favor de contactar al administrador','error');
        }
        if(error.status === 404){
          Swal.fire('Error',error.error.msg,'error');
        }
        console.log(error);
      })
      console.log(this.form_recuper.value)
    }else{
      this.http_service.preloadEvent$.emit(false);
      Swal.fire('Error','El correo electrónico es necesario','error');
    }
   
  }
}
