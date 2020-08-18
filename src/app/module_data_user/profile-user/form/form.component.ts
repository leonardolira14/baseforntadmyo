import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/data_user/user-service.service';
import { Serviecokie } from '../../../library/servercokie';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../../environments/environment.prod';
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
  logitomarca: any;
  submitted = false;


  constructor(
    private http: UserServiceService,
    private serviceCoooki: Serviecokie,
    private form_build: FormBuilder
  )
  {
    this.data_user = this.serviceCoooki.getCokie('data_user');
    this.data_company = this.serviceCoooki.getCokie('data_company');
    this.token = this.serviceCoooki.getCokie('token');
    this.http.dataMarca$.subscribe(data => {
      this.ngEditForm(data);
    });
 
    this.form_data = this.form_build.group({
      IDEmpresa: [''],
      Nombre: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Status: [''],
      Puesto: ['', Validators.required],
      Visible: [''],
      Correo: ['', Validators.required],
      IDUsuario: [''],
      Imagen: [''],
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
    const base_logo = '/assets/img/foto-no-disponible.jpg';
    const logo = environment.url_serve + 'assets/img/logosUsuarios/' + logo_;
    if (logo_ === '' || logo_ === null || logo_ === 'null') {
      this.logitomarca = base_logo;
    } else {
      this.logitomarca = logo;
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
    this.form_data_get['IDUsuario'].setValue(data['IDUsuario']);
    this.form_data_get['Imagen'].setValue(data['Imagen']);
    this.verificar_logo(data['Imagen']);
  }

  ngUpdate(form) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http.ngUpdate(form)
      .subscribe(data => {
        alert('Usuario Actualizado');
        console.log(data);
        this.form_data.reset();
        this.http.NewMarca$.emit(true);
      }, error => {
          if (error['status'] === 500) {
            if (error.error['code'] === 1995 || error.error['code'] === 1992 || error.error['code'] === 1990) {
              alert(error.error['result']);
              return;
            }
            alert('Error al cargar los datos');
            console.log(error);
          }
      });
    console.log(this.data_user);
  }
  ngSave(form) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http.ngadd(form)
      .subscribe(data => {
        console.log(data);
        alert('Nuevo usuario agregado');
        this.form_data.reset();
        this.http.NewMarca$.emit(true);
      }, error => {
          alert('Existe un error al guardar');
          console.log(error);
      });
  }
  ngSelect() {

    if (this.form_data.valid) {
      this.submitted = false;
      const Formdata = new FormData();
      Formdata.append('IDUsuario', this.form_data_get['IDUsuario'].value);
      Formdata.append('Nombre', this.form_data_get['Nombre'].value);
      Formdata.append('Apellidos', this.form_data_get['Apellidos'].value);
      Formdata.append('Status', this.form_data_get['Status'].value);
      Formdata.append('Puesto', this.form_data_get['Puesto'].value);
      Formdata.append('Visible', this.form_data_get['Visible'].value);
      Formdata.append('Correo', this.form_data_get['Correo'].value);
      Formdata.append('IDEmpresa', this.data_company['IDEmpresa']);
      Formdata.append('Imagen', this.form_data_get['Imagen'].value);
      Formdata.append('Archivo', this.filemarcalogo);
      Formdata.append('token', this.token);
      if (this.form_data_get['IDUsuario'].value === '') {
        this.ngSave(Formdata);
      } else {
        this.ngUpdate(Formdata);
      }
    } else {

      this.submitted = true;
    }
  }

  
}
