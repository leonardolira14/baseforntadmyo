import { Component, OnInit } from '@angular/core';
import { GirosServiceService } from '../../../../services/data_company/giros-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form_data: FormGroup;
  Lista_giros: [];
  Lista_subgiros: any =  [];
  Lista_Ramas: any = [];
  submitt = false;
  data_company = [];
  token = '';
  data_user: [];
  constructor(
    private http_service: EventsServiceService,
    private http: GirosServiceService,
    private cookieService: Serviecokie,
    private formbuild: FormBuilder
  ) {
    this.data_user = this.cookieService.getCokie('data_user');
    this.token = this.cookieService.getCokie('token');
    this.data_company = this.cookieService.getCokie('data_company');
    this.http.Certification$.subscribe(data => {
      this.form_data_edit(data);
    });
    this.http.ListaGirosemiter$.subscribe(data => {
      this.Lista_giros = data;
      console.log(data);
    });
    this.form_data = this.formbuild.group({
      IDEmpresa: [''],
      IDGE: [''],
      IDGiro: ['', Validators.required],
      IDGiro2: [''],
      IDGiro3: [''],
      Principal: [''],
      giron1: [''],
      giron2: [''],
      giron3: ['']
    });
   }

  ngOnInit(): void {
  }

  // funcion para agregar un nuevo giro
  addGiro() {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.submitt = true;
    this.get_Form_data['IDEmpresa'].setValue(this.data_company['IDEmpresa']);
    this.form_data.addControl('token', new FormControl(this.token));
    this.http_service.preloadEvent$.emit(true);
    if (this.form_data.valid) {
      if (this.get_Form_data['IDGE'].value === '') {
        this.http.service_add(this.form_data.value)
          .subscribe(data => {
            alert('Giro agregado');
            this.http.NewCertification$.emit(true);
          }, (error: HttpErrorResponse) => {
            alert('algo paso al agregar un giro' + error.error + ' Status: ' + error.status);
          }, () => this.http_service.preloadEvent$.emit(false));
      } else {
        this.http.ngUpdateCerticate(this.form_data.value)
          .subscribe(data => {
            alert('Giro actualizado');
            this.http.NewCertification$.emit(true);
          }, (error: HttpErrorResponse) => {
            alert('algo paso al actualizar un giro' + error.error + ' Status: ' + error.status);
          }, () => this.http_service.preloadEvent$.emit(false));
      }
      console.log(this.form_data.value);
    }
  }
  get get_Form_data() {
    return this.form_data.controls;
  }
  selectSub() {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http_service.preloadEvent$.emit(true);
    this.http.getallsubsector(this.get_Form_data['IDGiro'].value)
      .subscribe(data => {
        console.log(data);
        this.Lista_subgiros = data['response']['result'];
        if (this.Lista_subgiros.length > 0) {
          this.get_Form_data['IDGiro2'].setValidators([Validators.required]);
          this.get_Form_data['IDGiro2'].updateValueAndValidity();
        }
      }, (error: HttpErrorResponse) => {
          this.http_service.preloadEvent$.emit(false);
          alert('algo paso ' + error.message + ' Status: ' + error.status);
          console.log(error);
      }, () => this.http_service.preloadEvent$.emit(false));
  }

  Rama() {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http_service.preloadEvent$.emit(true);
    this.http.getrama(this.get_Form_data['IDGiro2'].value)
      .subscribe(data => {
        this.Lista_Ramas = data['response']['result'];
        console.log(this.Lista_Ramas);
        if (this.Lista_Ramas.length > 0) {
          this.get_Form_data['IDGiro3'].setValidators([Validators.required]);
          this.get_Form_data['IDGiro3'].updateValueAndValidity();
        }
      }, (error: HttpErrorResponse) => {
        this.http_service.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
      }, () => this.http_service.preloadEvent$.emit(false));
  }

  // funcipnpara poner los datos en el formulario
  form_data_edit(data) {
    this.get_Form_data['IDGiro'].setValue(data['IDGiro']);
    this.get_Form_data['IDGiro2'].setValue(data['IDGiro2']);
    this.selectSub();
    this.get_Form_data['IDGiro3'].setValue(data['IDGiro3']);
    this.Rama();
    this.get_Form_data['IDGE'].setValue(data['IDGE']);
    this.get_Form_data['Principal'].setValue(data['Principal']);
  }

}
