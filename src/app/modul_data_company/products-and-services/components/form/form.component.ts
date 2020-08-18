import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../../../services/data_company/products-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment.prod';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
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
    private form_builder: FormBuilder
  ) {
    this.data_user = this.serviceCookie.getCokie('data_user');
    this.token = this.serviceCookie.getCokie('token');
    this.data_company = this.serviceCookie.getCokie('data_company');
    this.http.dataMarca$.subscribe(data => {
      this.ngEdit(data);
    });
    this.form_producto = this.form_builder.group({
      Promocion: [''],
      Descripcion: ['', Validators.required],
      Fecha: [''],
      Foto: [''],
      Clave: [''],
      IDEmpresa: [''],
      IDProducto: [''],
      Producto: ['', Validators.required],
    });
  }
  get get_form() {
    return this.form_producto.controls;
  }
  ngOnInit(): void {
  }
  ngEdit(data) {
    this.get_form['Promocion'].setValue(data['Promocion']);
    this.get_form['Descripcion'].setValue(data['Descripcion']);
    this.get_form['Fecha'].setValue(data['Fecha']);
    this.get_form['Foto'].setValue(data['Foto']);
    this.get_form['Clave'].setValue(data['Clave']);
    this.get_form['IDEmpresa'].setValue(data['IDEmpresa']);
    this.get_form['IDProducto'].setValue(data['IDProducto']);
    this.get_form['Producto'].setValue(data['Producto']);
    this.selectLogo(this.get_form['Foto'].value);
  }
  ngUpdate(form) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http_services.preloadEvent$.emit(true);
    this.submitted = true;
    this.http.ngUpdate(form)
      .subscribe(data => {
        this.http.NewMarca$.emit(true);
        alert('Prodcuto Actualizado');
        this.form_producto.reset();
        this.logitomarca = '/assets/img/foto-no-disponible.jpg';
      }, (error: HttpErrorResponse) => {
          this.http_services.preloadEvent$.emit(false);
          alert('algo paso ' + error.message + ' Status: ' + error.status);
          console.log(error);
          console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngSave(form) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http_services.preloadEvent$.emit(true);
    this.http.marca_add(form)
      .subscribe(data => {
        if (data['result'] !== 1991) {
          this.http.NewMarca$.emit(true);
          alert('Prodcuto Agregado');
          this.form_producto.reset();
          this.logitomarca = '/assets/img/foto-no-disponible.jpg';
        } else {
          alert('Prodcuto No Agregado, plan basico');
        }
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngSelect() {
    if (this.data_user['Tipo_Usuario'] !== 'Master') {
      this.ivalid = true;
      this.text_alert = 'Lo sentimos no favor de contactar al usuario master para realizar modificaciones o cambios.';
      return;
    }
    this.submitted = true;
    if (!this.form_producto.valid) {
      return;
    }
    const form = new FormData();
    form.append('Promocion', this.get_form['Promocion'].value);
    form.append('Descripcion', this.get_form['Descripcion'].value);
    form.append('Fecha', this.get_form['Fecha'].value);
    form.append('Foto', this.get_form['Foto'].value);
    form.append('Clave', this.get_form['Clave'].value);
    form.append('IDProducto', this.get_form['IDProducto'].value);
    form.append('Producto', this.get_form['Producto'].value);
    form.append('token', this.token);
    if (this.filemarcalogo === null) {
      form.append('Archivo', '');
    } else {

      form.append('Archivo', this.filemarcalogo);
    }
    if (this.get_form['IDProducto'].value === '') {
      form.append('IDEmpresa', this.data_company['IDEmpresa']);
      this.ngSave(form);
    } else {
      form.append('IDEmpresa', this.get_form['IDEmpresa'].value);
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
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    const base_logo = '/assets/img/foto-no-disponible.jpg';
    const logo = environment.url_serve + 'assets/img/logoprod/' + logo_;
    if (logo_ === '' || logo_ === null || logo_ === 'null') {
      this.logitomarca = base_logo;
    } else {
      this.logitomarca = logo;
    }
  }

}
