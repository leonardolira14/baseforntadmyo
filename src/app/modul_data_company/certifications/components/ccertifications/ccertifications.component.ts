import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CertificationsServiceService } from '../../../../services/data_company/certifications-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Serviecokie } from '../../../../library/servercokie';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ccertifications',
  templateUrl: './ccertifications.component.html',
  styleUrls: ['./ccertifications.component.scss']
})
export class CcertificationsComponent implements OnInit {
  desaparece = true;
  ivalid = false;
  subttmited = false;
  model: NgbDateStruct;
  form_certification: FormGroup;
  filemarcalogo: File = null;
  imagePath: any;
  nombreFile: any;
  data_company: [];
  data_user: [];
  temp_id = '';
  LisCertificaciones = {
    Calidad: [
      'ISO', 'Q', 'PESC', 'FSC', 'EMAS', 'OHSAS', 'IFS', 'FSSC', 'BRC', 'HACCP', 'GLOBALGAP',
      'SEDEX', 'SEDEX', 'UNE', 'NOM', 'NMX', 'FIRCO', 'IFA', 'GRASP'
    ],
    Fiscal: [
    ]
  };
  tem_certifi = ['Fiscal','Calidad'];
  constructor(
    private http_service: EventsServiceService,
    private http: CertificationsServiceService,
    private formBuild: FormBuilder,
    private service_cookie: Serviecokie
  ) {
    this.http.Certification$.subscribe(data => {
      this.ngGetCertification(data);
    });
    this.data_user = this.service_cookie.getCokie('data_user');
    this.data_company = this.service_cookie.getCokie('data_company');
    this.form_certification = this.formBuild.group({
      Certificacion: ['', Validators.required],
      FechaCertificacion: ['', Validators.required],
      Calificacion: [''],
      FechaVencimiento: [''],
      TipoCertificacion: ['', Validators.required],
      Clase: [''],
      EmpresaCertificadora: ['', Validators.required],
      Archivo: ['', Validators.required],
      Filey: [''],
    });
   }

  ngOnInit(): void {
    
  }
  ngChangeCertificaciones(index) {
    console.log(index)
    this.tem_certifi = this.LisCertificaciones[index];
    if (index === 'Calidad') {
      this.form_certification.controls['FechaVencimiento'].setValidators([Validators.required]);
      this.form_certification.controls['Calificacion'].setValidators([Validators.required]);
      this.form_certification.controls['Clase'].setValidators([Validators.required]);
      this.desaparece = true;
    } else {
      this.form_certification.controls['FechaVencimiento'].setValue('-');
      this.form_certification.controls['Calificacion'].updateValueAndValidity();
      this.form_certification.controls['Clase'].updateValueAndValidity();
      this.desaparece = false;
    }
  }
  ngAddCertificacion() {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.subttmited = true;
    this.ivalid = false;
    if (this.form_certification.valid) {

      const formdata = new FormData();
      formdata.append('Logo', this.filemarcalogo);
      formdata.append('Certificacion', this.form_certification.controls['Certificacion'].value);
      formdata.append('Calificacion', this.form_certification.controls['Calificacion'].value);
      formdata.append('Archivo', this.form_certification.controls['Archivo'].value);
      formdata.append('Clase', this.form_certification.controls['Clase'].value);
      formdata.append('TipoCertificacion', this.form_certification.controls['TipoCertificacion'].value);
      formdata.append('EmpresaCertificadora', this.form_certification.controls['EmpresaCertificadora'].value);
      let fech = this.form_certification.controls['FechaVencimiento'].value;
      formdata.append('FechaVencimiento', fech.year + '-' + fech.month + '-' + fech.day);
      fech = this.form_certification.controls['FechaCertificacion'].value;
      formdata.append('FechaCertificacion', fech.year + '-' + fech.month + '-' + fech.day);

      this.http_service.preloadEvent$.emit(true);
      if (this.temp_id === '') {

       // si esta vacio quiere decir que lo voy agregar
      this.http.service_add(formdata)
        .subscribe(data => {
          console.log(data);
        Swal.fire('Exito','Certificacion registrada','success');
          this.form_certification.reset();
          this.http.NewCertification$.emit(true);
        }, (error: HttpErrorResponse) => {
            this.http_service.preloadEvent$.emit(false);
            if(error.status === 500){
              Swal.fire('Error','Error favor de contactar al administrador','info');
            }
            if(error.status === 404){
              Swal.fire('Error',error.error.msg,'info');
            }
            if(error.status === 400){
              Swal.fire('Error',error.error.msg,'info');
            }

            console.log(error);
        }, () => {
            this.http_service.preloadEvent$.emit(false);
        });
    } else {
       // ahora lo actualizo
      this.http.ngUpdateCerticate(formdata,this.temp_id)
        .subscribe(data => {
          console.log(data);
          Swal.fire('Exito','Datos actualizados','success');
          this.form_certification.reset();
          this.http.NewCertification$.emit(true);
        }, (error: HttpErrorResponse) => {
          this.http_service.preloadEvent$.emit(false);
          if(error.status === 500){
            Swal.fire('Error','Error favor de contactar al administrador','info');
          }
          if(error.status === 404){
            Swal.fire('Error',error.error.msg,'info');
          }
          if(error.status === 400){
            Swal.fire('Error',error.error.msg,'info');
          }

          console.log(error);
        },  () => {
          this.http_service.preloadEvent$.emit(false);
        });
    }
    } else {
      this.subttmited = true;
      this.ivalid = true;
    }

  }
  get from_get_data() {
    return this.form_certification.controls;
}
  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    this.filemarcalogo = ( files[0] as File);
    const reader = new FileReader();
    this.imagePath = files;
    console.log(this.imagePath);
    this.form_certification.controls['Archivo'].setValue(this.imagePath[0]['name']);
    this.form_certification.patchValue({
      Filey: this.filemarcalogo
    });
  }

  // funcion para obtener los datos de una certificacion
  ngGetCertification(data) {
   
    let fe = data['FechaCertificacion'].split('-');
    // tslint:disable-next-line: radix
    const date = new NgbDate(parseInt(fe[0]), parseInt(fe[1]), parseInt(fe[2]));

    fe = data['FechaVencimiento'].split('-');
    // tslint:disable-next-line: radix
    const datev = new NgbDate(parseInt(fe[0]), parseInt(fe[1]), parseInt(fe[2]));
    this.ngChangeCertificaciones(  data['TipoCertificacion']);

    this.form_certification.controls['Certificacion'].setValue(data['Certificacion']);
    this.temp_id  = data['id'];
    this.form_certification.controls['FechaCertificacion'].setValue(date);
    this.form_certification.controls['Calificacion'].setValue(data['Calificacion']);
    this.form_certification.controls['Archivo'].setValue(data['Archivo']);
    this.form_certification.controls['FechaVencimiento'].setValue(datev);
    this.form_certification.controls['TipoCertificacion'].setValue(data['TipoCertificacion']);
    this.form_certification.controls['Clase'].setValue(data['Clase']);
    this.form_certification.controls['EmpresaCertificadora'].setValue(data['EmpresaCertificadora']);
  }


}
