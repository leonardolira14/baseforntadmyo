import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../services/data_user/user-service.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss']
})
export class FormPasswordComponent implements OnInit {
  token = '';
  data_company = [];
  data_user = [];
  form_data_pass: FormGroup;
  submitted_pass = false;
  ivalid = false;
  text_alert = 'Algunos de los campos parecen incompletos. Por favor revisalos y revisa la información correspondiente.';
  constructor(
    private http: UserServiceService,
    private serviceCoooki: CookieService,
    private form_build: FormBuilder
  ) {
    this.data_user = JSON.parse(this.serviceCoooki.get('data_user'));
    this.data_company = JSON.parse(this.serviceCoooki.get('data_company'));
    this.token = this.serviceCoooki.get('token');
    this.form_data_pass = this.form_build.group({
      IDUsuario: [this.data_user['IDUsuario']],
      IDEmpresa: [this.data_user['IDEmpresa']],
      token: [this.token],
      ClaveAnterior: ['', Validators.required],
      ClaveNueva: ['', Validators.required],
      RepetirClave: ['', Validators.required],
    });
   }
  
  get obtener_form() {
    return this.form_data_pass.controls;
  }
  ngOnInit(): void {
  }
  ngUpdatePass() {

    
    console.log(this.form_data_pass.valid);
    if (this.form_data_pass.valid) {
      if (this.obtener_form['ClaveNueva'].value !== this.obtener_form['RepetirClave'].value) {
        this.ivalid = true;
        this.submitted_pass = true;
        this.text_alert = 'Algunos de los campos parecen incompletos. Las contraseñas no coinciden.';
        return;
      }
      this.ivalid = false;
      this.submitted_pass = false;
      this.http.ngUpdatePass(this.form_data_pass.value)
        .subscribe(data => {
          alert('Constraseña Actualizada, Se Recomienda cerrar sesion e inicar nuevamente para actualizar los datos');
          console.log(data);
        }, error => {
            if (error['status'] === 500) {
              if (error.error['code'] === 1995 || error.error['code'] === 1992 || error.error['code'] === 1990) {
                this.ivalid = true;
                this.text_alert = 'Algunos de los campos parecen incompletos.' + error.error['result'];
                return;
              }
              this.ivalid = true;
              this.text_alert = 'Algunos de los campos parecen incompletos. Error al cargar los datos.';
            }
        });

    } else {
      this.ivalid = true;
      this.submitted_pass = true;
    }
  }
}
