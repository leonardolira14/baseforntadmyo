import { Component, OnInit } from '@angular/core';
import { AsociacionServiceService } from '../../../../services/data_company/asociacion-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serviecokie } from '../../../../library/servercokie';
@Component({
  selector: 'app-cassociations',
  templateUrl: './cassociations.component.html',
  styleUrls: ['./cassociations.component.scss']
})
export class CassociationsComponent implements OnInit {
  submitted = false;
  ivalid = false;
  text_alert = 'Algunos de los campos parecen incompletos. Por favor revisalos y revisa la información correspondiente.';
  form_asociacion: FormGroup;
  filemarcalogo: File = null;
  imagePath: any;
  nombreFile: any;
  data_company: [];
  data_user: [];
  estados: [];
  Lita_Asociation = [];
  token = '';
  logitomarca: any = '/assets/img/foto-no-disponible.jpg';
  url_server = environment.url_serve;
  constructor(
    private htt_services: EventsServiceService,
    private http: AsociacionServiceService,
    private formBuild: FormBuilder,
    private service_cookie: Serviecokie
  ) {
    this.data_company = this.service_cookie.getCokie('data_company');
    this.data_user = this.service_cookie.getCokie('data_user');
    this.token = this.service_cookie.getCokie('token');
    this.form_asociacion = this.formBuild.group({
      Nombre: ['', Validators.required],
      Siglas: ['', Validators.required],
      Web: ['', Validators.required],
      Tel: ['', Validators.required],
      Calle: ['', Validators.required],
      Colonia: ['', Validators.required],
      Municipio: [''],
      Estado: [''],
      CP: [''],
      IDAsociacion: [''],
      IDAsocia: [''],
      IDEmpresa: [''],
      Archivo: [''],
      Token: ['']
    });
    this.http.Certification$.subscribe(data => {
      this.ngPutdata(data);
    });
    this.http.ListCertifications$.subscribe(data => {
      console.log(data);
      this.estados = data['Estados'];
      this.Lita_Asociation = data['Certificados'];
    });
  }

  get from_get_data() {
    return this.form_asociacion.controls;
  }
  ngOnInit(): void {
  }


  ngSelect() {
    console.log(this.data_user['Tipo_Usuario']);
    if (this.data_user['Tipo_Usuario'] !== 'Master') {
      this.ivalid = true;
      this.text_alert = 'Lo sentimos no favor de contactar al usuario master para realizar modificaciones o cambios.';
      return;
    }
    console.log(this.data_user);
    this.submitted = true;
    if (this.form_asociacion.invalid) {
      this.ivalid = true;
      this.text_alert = 'Algunos de los campos parecen incompletos. Por favor revisalos y revisa la información correspondiente.';
    } else {
      const Formdata = new FormData();
      Formdata.append('Logo', this.filemarcalogo);
      Formdata.append('Nombre', this.from_get_data['Nombre'].value);
      Formdata.append('Siglas', this.from_get_data['Siglas'].value);
      Formdata.append('Web', this.from_get_data['Web'].value);
      Formdata.append('Tel', this.from_get_data['Tel'].value);
      Formdata.append('Calle', this.from_get_data['Calle'].value);
      Formdata.append('Colonia', this.from_get_data['Colonia'].value);
      Formdata.append('Municipio', this.from_get_data['Municipio'].value);
      Formdata.append('Estado', this.from_get_data['Estado'].value);
      Formdata.append('IDAsociacion', this.from_get_data['IDAsociacion'].value);
      Formdata.append('IDAsocia', this.from_get_data['IDAsocia'].value);
      Formdata.append('Archivo', this.from_get_data['Archivo'].value);
      Formdata.append('IDEmpresa', this.data_company['IDEmpresa']);
      Formdata.append('Token', this.token);
      if (this.from_get_data['IDAsocia'].value === '') {

        this.ngAddAsociacion(Formdata);
      } else {
        this.ngUpdate(Formdata);
      }
      this.submitted = false;
      this.ivalid = false;
    }
  }
  ngAddAsociacion(datos) {
    this.htt_services.preloadEvent$.emit(true);
    this.http.ngAdd(datos)
      .subscribe(data => {
        this.http.NewCertification$.emit(true);
      }, (error: HttpErrorResponse) => {
        this.htt_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => {
        this.htt_services.preloadEvent$.emit(false);
      });
  }
  ngUpdate(datos) {
    this.htt_services.preloadEvent$.emit(true);
    this.http.ngUpdate(datos)
      .subscribe(data => {
        this.http.NewCertification$.emit(true);
      }, (error: HttpErrorResponse) => {
        this.htt_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => {
        this.htt_services.preloadEvent$.emit(false);
      });
  }
  ngPutdata(data) {
    console.log(data);
    this.from_get_data['Nombre'].setValue(data['Nombre']);
    this.from_get_data['Siglas'].setValue(data['Siglas']);
    this.from_get_data['Web'].setValue(data['Web']);
    this.from_get_data['Tel'].setValue(data['Telefono']);
    this.from_get_data['Calle'].setValue(data['Direccion']);
    this.from_get_data['Colonia'].setValue(data['Colonia']);
    this.from_get_data['Municipio'].setValue(data['Municipio']);
    this.from_get_data['Estado'].setValue(data['Estado']);
    this.from_get_data['CP'].setValue(data['CP']);
    this.from_get_data['IDAsociacion'].setValue(data['IDAsociacion']);
    this.from_get_data['IDAsocia'].setValue(data['IDAsocia']);
    this.from_get_data['IDEmpresa'].setValue(data['IDEmpresa']);
    this.from_get_data['Archivo'].setValue(data['Imagen']);
    if (data['Imagen'] !== null) {
      this.logitomarca = this.url_server + 'assets/img/asociaciones/' + data['Imagen'];
    }
  }
  // previw de imagenb
  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Only images are supported.');
      return;
    }
    this.filemarcalogo = ( files[0] as File);
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logitomarca = reader.result;
    };
  }

}
