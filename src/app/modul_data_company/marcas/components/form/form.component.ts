import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Serviecokie } from '../../../../library/servercokie';
import { MarcasServiceService } from '../../../../services/data_company/marcas-service.service';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../../services/events-service.service';
import Swal from 'sweetalert2';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form_marca: FormGroup;
  filemarcalogo: File = null;
  logitomarca: any;
  public imagePath;
  private data_company = [];
  token = '';
  submitted = false;
  ivalid = false;
  data_user = [];
  text_alert = 'Algunos de los campos parecen incompletos. Por favor revisalos y revisa la información correspondiente.';

  constructor(
    private http_services: EventsServiceService,
    private formBuilder: FormBuilder,
    private http: MarcasServiceService,
    private serviceCookie: Serviecokie,
    private DomSanitizer : DomSanitizer
  ) {
    this.data_user = this.serviceCookie.getCokie('data_user');
    this.http.dataMarca$
      .subscribe(data => {
        this.editMarca(data);
      });
    
    this.form_marca = this.formBuilder.group({
      Marca: ['', Validators.required],
      Archivo: [''],
      Logo: [''],
      IDMarca: ['']
    });
  }
  get form_get() {
    return this.form_marca.controls;
}
  ngOnInit(): void {
    this.logitomarca = '/assets/img/foto-no-disponible.jpg';
  }

  // funcion para agregar una nueva marca
  addmarca() {
    
    if (this.form_marca.valid) {
      this.http_services.preloadEvent$.emit(true);
      this.submitted = true;
      
      const Formdata = new FormData();
      if(this.filemarcalogo){
        Formdata.append('Logo', this.filemarcalogo);
      }else{
        Formdata.append('Logo', this.form_marca.controls['Logo'].value);
      }
      
      
      Formdata.append('Marca', this.form_marca.controls['Marca'].value);
      

      if (this.form_marca.controls['IDMarca'].value === '') {
        if (this.filemarcalogo === null) {
          const conf = confirm('Desea mandar la marca sin logo');
          if (!conf) {
            return;
          }
        }
        // si esta vacio quiere decir que voy agregar una nueva marca
        this.http.marca_add(Formdata)
          .subscribe(data => {
            this.http.NewMarca$.emit(true);
            Swal.fire('Exito','Marca Registrada','success');
           
            this.form_marca.reset();
            this.ngOnInit();
          }, (error: HttpErrorResponse) => {
            this.http_services.preloadEvent$.emit(false);
            Swal.fire('error','algo paso ' + error.message + ' Status: ' + error.status,'error');
            console.log(error);
           
          }, () => this.http_services.preloadEvent$.emit(false));
      } else {
        
        // si esta lleno quiere decitr que la voy a actualizar
        this.http.ngUpdate(Formdata,this.form_marca.controls['IDMarca'].value)
          .subscribe(data => {
            this.http.NewMarca$.emit(true);
            Swal.fire('Exito','Marca actualizada','success');
            this.form_marca.reset();
            this.ngOnInit();
          }, (error: HttpErrorResponse) => {
            this.http_services.preloadEvent$.emit(false);
            Swal.fire('error','algo paso ' + error.message + ' Status: ' + error.status,'error');
            console.log(error);
           
          }, () => this.http_services.preloadEvent$.emit(false));
      }
    } else {
      this.submitted = true;
   }
  }
  verificar_logo(logo_) {
    if (logo_ === '' || logo_ === null || logo_ === undefined) {
    this.logitomarca ='/assets/img/foto-no-disponible.jpg';
    } else {
      this.logitomarca =this.DomSanitizer.bypassSecurityTrustUrl(logo_);
    }
    console.log(this.logitomarca);
    return this.logitomarca;
    
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
    this.filemarcalogo = <File>files[0];
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logitomarca = reader.result;
    };
  }

  // funcion para poner los datos de una marca en el form
  editMarca(datos) {
    
    this.form_marca.controls['Marca'].setValue(datos['Marca']);
    this.form_marca.controls['IDMarca'].setValue(datos['id']);
    this.form_marca.controls['Archivo'].setValue(datos['Logo']);
    this.verificar_logo(datos['Logo']);
  }
}
