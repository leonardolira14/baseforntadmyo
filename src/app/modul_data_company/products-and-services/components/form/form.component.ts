import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../../../services/data_company/products-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment.prod';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form_producto: FormGroup;
  filemarcalogo: File = null;
  logitomarca: any = '/assets/img/foto-no-disponible.jpg';
  public imagePath;
  submitted = false;
  token = '';
  data_company = [];
  data_user = [];
  ivalid = false;
  text_alert = 'Algunos de los campos parecen incompletos. Por favor revisalos y revisa la información correspondiente.';
  constructor(
    private http_services: EventsServiceService,
    private http: ProductsServiceService,
    private serviceCookie: Serviecokie,
    private form_builder: FormBuilder,
    private DomSanitizer : DomSanitizer
  ) {
    this.data_user = this.serviceCookie.getCokie('data_user');
    this.token = this.serviceCookie.getCokie('token');
    this.data_company = this.serviceCookie.getCokie('data_company');
    this.http.dataMarca$.subscribe(data => {
      this.ngEdit(data);
    });
    this.form_producto = this.form_builder.group({
      Descripcion: ['', Validators.required],
      Logo: [''],
      Clave: [''],
      id: [''],
      Producto: ['', Validators.required],
    });
  }
  get get_form() {
    return this.form_producto.controls;
  }
  ngOnInit(): void {
  }
  ngEdit(data) {
   
    this.get_form['Descripcion'].setValue(data['Descripcion']);
    this.get_form['Logo'].setValue(data['Logo']);
    this.get_form['Clave'].setValue(data['Clave']);
    this.get_form['id'].setValue(data['id']);
    this.get_form['Producto'].setValue(data['Producto']);
    this.selectLogo(this.get_form['Logo'].value);
  }
  ngUpdate(form) {

    
    this.http_services.preloadEvent$.emit(true);
    this.submitted = true;
    this.http.ngUpdate(form,this.get_form['id'].value)
      .subscribe(data => {
        this.http.NewMarca$.emit(true);
        Swal.fire('Exito','Producto Actualizado','success');
        this.form_producto.reset();
        this.logitomarca = '/assets/img/foto-no-disponible.jpg';
      }, (error: HttpErrorResponse) => {
          this.http_services.preloadEvent$.emit(false);
          Swal.fire('Error','algo paso ' + error.message + ' Status: ' + error.status,'info');
          console.log(error);
          console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngSave(form) {
    
    this.http_services.preloadEvent$.emit(true);
    this.http.marca_add(form)
      .subscribe(data => {
        console.log(data);
        if (data['code'] !== 1991) {
          this.http.NewMarca$.emit(true);
          Swal.fire('Exito','Producto Agregado','success');
          this.form_producto.reset();
          this.logitomarca = '/assets/img/foto-no-disponible.jpg';
        } else {
          
        }
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        if(error.status===404 && error.error.code ===1991){
          Swal.fire('Error','Producto No Agregado, plan basico','info');
        }
        if(error.status===500){
          Swal.fire('Error','algo paso ' + error.message + ' Status: ' + error.status,'info');
        }
        
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngSelect() {
   
    this.submitted = true;
    if (!this.form_producto.valid) {
      return;
    }
   
    const form = new FormData();
    
    form.append('Descripcion', this.get_form['Descripcion'].value);
    form.append('Clave', this.get_form['Clave'].value);
    form.append('id', this.get_form['id'].value);
    form.append('Producto', this.get_form['Producto'].value);

    if (this.get_form['id'].value === '') {
      if (this.filemarcalogo !== null) {
        form.append('Logo', this.filemarcalogo);
      }
      this.ngSave(form);
    } else {
      if (this.filemarcalogo !== null) {
        form.append('Logo', this.filemarcalogo);
      }else{
        form.append('Logo',this.get_form['Logo'].value);
      }
      this.ngUpdate(form);
    }
  }

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

  selectLogo(logo_) {
    
    
    if (logo_ === '' || logo_ === null || logo_ === undefined) {
      this.logitomarca = '/assets/img/foto-no-disponible.jpg';
    } else {
      this.logitomarca = this.DomSanitizer.bypassSecurityTrustUrl(logo_);
    }
  }

}
