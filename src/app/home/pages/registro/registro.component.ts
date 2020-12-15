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
      razon_social: ['', Validators.required],
      nombre_comercial: ['', Validators.required],
      rfc: ['', Validators.required],
      tipopersona: ['', Validators.required],
      sector: ['', Validators.required],
      subsector: ['', Validators.required],
      rama: [''],
      usuario: this.formBuilder.group({
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        correo: ['', [Validators.required,Validators.email]],
        correo2: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
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
        this.giros_list = data['response']['result'];
        console.log(data);
      });
  }
  ngsubgiro(index) {
    this.http_giro.getallsubsector(index)
      .subscribe(data => {
        this.subgiro_list = data['response']['result'];
        console.log(data);
      });
  }
  ngrama(index) {
    this.http_giro.getrama(index)
      .subscribe(data => {
        this.ramas_list = data['response']['result'];
        console.log(data);
      });
  }
  get form_validator(){
    return this.form_company.controls;
  }
  get from_validator_usuario() {
    return this.form_company.get('usuario');
  }

  send() {
    if (this.form_company.get('usuario.password').value !== this.form_company.get('usuario.password2').value) {
      Swal.fire('Error', 'Las contraseñas no son iguales.', 'error');
      return false;
    }
    if (this.form_company.get('usuario.correo').value !== this.form_company.get('usuario.correo2').value) {
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
              Swal.fire('Error', error.error.response.msj, 'error');
              return false;
            }
            if (error.status === 505) {
              Swal.fire('Error', 'Error interno consulte al administrador', 'error');
              return false;
            }
            
        });
      
    } else {
      this.subttmited = true;
    }
  }

}
