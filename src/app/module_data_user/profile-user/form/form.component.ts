import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/data_user/user-service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { EventsServiceService } from '../../../services/events-service.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  data_user = [];
  form_data: FormGroup;
  public form_cambio_contrasena = false;
  data_company = [];
  token = '';
  filemarcalogo: File = null;
  logitomarca: any ='/assets/img/foto-no-disponible.jpg';
  submitted = false;


  constructor(
    private http: UserServiceService,
    private form_build: FormBuilder,
    private DomSanitizer : DomSanitizer,
    private http_services:EventsServiceService
  )
  {

    this.http.dataMarca$.subscribe(data => {
      this.ngEditForm(data);
    });
 
    this.form_data = this.form_build.group({
      Nombre: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Status: [''],
      Puesto: ['', Validators.required],
      Visible: [''],
      Correo: ['', Validators.required],
      id: [''],
      Logo: [''],
      Tipo_Usuario: ['']
    });
    
    this.verificar_logo('');
  }
  get form_data_get() {
    return this.form_data.controls;
  }
  
  ngOnInit(): void {
  }
  verificar_logo(logo_) {
    if (logo_ === '' || logo_ === null || logo_ === undefined) {
      this.logitomarca = '/assets/img/foto-no-disponible.jpg';
    } else {
      this.logitomarca =  this.DomSanitizer.bypassSecurityTrustUrl(logo_);
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
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logitomarca = reader.result;
    };
  }
  ngEditForm(data) {
    console.log(data);
    this.form_data_get['Nombre'].setValue(data['Nombre']);
    this.form_data_get['Apellidos'].setValue(data['Apellidos']);
    this.form_data_get['Status'].setValue(data['Status']);
    this.form_data_get['Puesto'].setValue(data['Puesto']);
    this.form_data_get['Visible'].setValue(data['Visible']);
    this.form_data_get['Correo'].setValue(data['Correo']);
    this.form_data_get['id'].setValue(data['id']);
    if(data['Logo']){
      this.form_data_get['Logo'].setValue(data['Logo']);
    }
    
    this.verificar_logo(data['Logo']);
  }

  ngUpdate(form) {
    this.http_services.preloadEvent$.emit(true);
   
    this.http.ngUpdate(this.form_data.controls['id'].value ,form)
      .subscribe(data => {
        this.http_services.preloadEvent$.emit(false);
        Swal.fire('Exito','Usuario actualizado','success');
        console.log(data);
        this.form_data.reset();
        this.http.NewMarca$.emit(true);
        this.logitomarca = '/assets/img/foto-no-disponible.jpg'
      }, error => {
        this.http_services.preloadEvent$.emit(false);
          if (error['status'] === 500) {
            if (error.error['code'] === 1995 || error.error['code'] === 1992 || error.error['code'] === 1990) {
              alert(error.error['result']);
              return;
            }
            alert('Error al cargar los datos');
            Swal.fire('Error','Error al cargar los datos','error');
            console.log(error);
          }
      });
    console.log(this.data_user);
  }
  ngSave(form) {
    this.http_services.preloadEvent$.emit(true);
    this.http.ngadd(form)
      .subscribe(data => {
        this.http_services.preloadEvent$.emit(false);
        
        Swal.fire('Exito','Nuevo usuario agregado','success');
        this.form_data.reset();
        this.http.NewMarca$.emit(true);
      }, error => {
        this.http_services.preloadEvent$.emit(false);
          Swal.fire('Error','Existe un error al guardar','error');
          console.log(error);
      });
  }
  ngSelect() {

    if (this.form_data.valid) {
      this.submitted = false;
      const Formdata = new FormData();
      Formdata.append('id', this.form_data_get['id'].value);
      Formdata.append('Nombre', this.form_data_get['Nombre'].value);
      Formdata.append('Apellidos', this.form_data_get['Apellidos'].value);
      Formdata.append('Status', this.form_data_get['Status'].value);
      Formdata.append('Puesto', this.form_data_get['Puesto'].value);
      Formdata.append('Visible', this.form_data_get['Visible'].value);
      Formdata.append('Correo', this.form_data_get['Correo'].value);
     
      if(this.filemarcalogo === null){
        Formdata.append('Logo', this.form_data_get['Logo'].value);
      }else{
        Formdata.append('Logo', this.filemarcalogo);
      }
      
      if (this.form_data_get['id'].value === '') {
        this.ngSave(Formdata);
      } else {
        this.ngUpdate(Formdata);
      }
    } else {

      this.submitted = true;
    }
  }

  
}
