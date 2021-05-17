import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceDataCompanyService } from '../../../services/service-data-company.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../services/events-service.service';
import { GirosServiceService } from '../../../services/data_company/giros-service.service';
import { switchAll } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  giros_list = [];
  subgiro_list = [];
  ramas_list = [];
  ivalid = false;
  subttmited = false;
  form_company: FormGroup;
  constructor(
    private http_services: EventsServiceService,
    private formBuilder: FormBuilder,
    private http: ServiceDataCompanyService,
    private http_giro: GirosServiceService
  ) { 
    this.http_services.preloadEvent$.emit(false);
    this.form_company = this.formBuilder.group({
      RazonSocial: ['', Validators.required],
      NombreComercial: ['', Validators.required],
      Rfc: ['', Validators.required],
      Persona: ['', Validators.required],
      Giro: ['', Validators.required],
      SubGiro: ['', Validators.required],
      Rama: [''],
      usuario: this.formBuilder.group({
        Nombre: ['', Validators.required],
        Apellidos: ['', Validators.required],
        Correo: ['', [Validators.required,Validators.email]],
        correo2: ['', [Validators.required, Validators.email]],
        Password: ['', Validators.required],
        password2: ['', [ Validators.required]]
      })
    });
  }

  ngOnInit(): void {
    this.ngGetGiros();
  }
  ngGetGiros() {
    this.http_giro.getAllGiiro()
      .subscribe(data => {
        this.giros_list = data['giros'];
      });
  }
  ngsubgiro(index) {
    this.http_giro.getallsubsector(index)
      .subscribe(data => {
        this.subgiro_list = data['subgiros'];
      });
  }
  ngrama(index) {
    this.http_giro.getrama(index)
      .subscribe(data => {
        console.log(data);
        this.ramas_list = data['ramas'];
       
      });
  }
  get form_validator(){
    return this.form_company.controls;
  }
  get from_validator_usuario() {
    return this.form_company.get('usuario');
  }

  send() {
    if (this.form_company.get('usuario.Password').value !== this.form_company.get('usuario.password2').value) {
      Swal.fire('Error', 'Las contraseñas no son iguales.', 'error');
      return false;
    }
    if (this.form_company.get('usuario.Correo').value !== this.form_company.get('usuario.correo2').value) {
      Swal.fire('Error', 'Las direcciones de correo no son iguales.', 'error');
      return false;
    }
    if (this.form_company.valid) {
      this.http.register(this.form_company.value)
        .subscribe(data => {
          console.log(data);
        }, (error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 404) {
              Swal.fire('Error', error.error.msg, 'error');
              return false;
            }
            if (error.status === 500) {
              Swal.fire('Error', 'Error interno consulte al administrador', 'error');
              return false;
            }
            
        });
      
    } else {
      this.subttmited = true;
    }
  }

}
