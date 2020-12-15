import { Component, OnInit } from '@angular/core';
import { Serviecokie } from '../../../../library/servercokie';
import { EventsServiceService } from '../../../../services/events-service.service';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';
declare var Conekta: any;
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {
  nombre_plan = '0';
  costo_plan = 0;
  datos_pago;
  form_pago: FormGroup;
  messes = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];
  anio = [];
  submitted = false;
  datos_user = [];
  datos_company = [];
  pago_general = [];
  constructor(
    private servicescookie: Serviecokie,
    private http_services: EventsServiceService,
    private formbuilder: FormBuilder
  ) {
    Conekta.setPublicKey('key_EDxZCrdzJsGgsEaqzxutE8A');
    Conekta.setLanguage('es');

    this.datos_user = this.servicescookie.getCokie('data_user');
    this.datos_company = this.servicescookie.getCokie('data_comapny');
    console.log(this.datos_user);
    this.datos_pago = JSON.parse(localStorage.getItem('pago'));
    this.http_services.preloadEvent$.emit(false);
    this.form_pago = this.formbuilder.group({
      Nombre: [this.datos_user['Nombre'], Validators.required],
      Apellidos: [this.datos_user['Apellidos'], Validators.required],
      Correo: [this.datos_user['Correo'], Validators.required],
      Tarjeta: ['', [Validators.required, Validators.min(16)]],
      Mes: ['', Validators.required],
      Anio: ['', Validators.required],
      CVV: ['', [Validators.required, Validators.min(3)]]
    });
   }
  get get_form() {
    return this.form_pago.controls;
}
  ngOnInit(): void {
    this.costo_plan = this.datos_pago['costo'];
    this.nombresplan(this.datos_pago['planID']);
    console.log(this.datos_pago);
    for (let i = 0; i <= 30; i++){
      let a = i + 2020;
      this.anio.push(a);
    }
  }
  nombresplan(index) {
    switch (index) {
      case 'planmicromensual':
        this.nombre_plan = 'Plan Micro-empresa mensual';
        break;
      case 'PlanAnualMicro':
        this.nombre_plan = 'Plan Micro-empresa mensual';
        break;
      case 'planempresarialmensual':
        this.nombre_plan = 'Plan Empresarial Mensual';
        break;
      case 'planempresarialanual':
        this.nombre_plan = 'Plan Empresarial Anual';
        break;
    }
  }
  pagar() {
    if (this.form_pago.valid) {
      console.log(this.form_pago.value);
      this.pago_tarjeta();
    } else {
      this.submitted = true;
    }
   
  }

  async pago_tarjeta() {
    this.pago_general['datos_pago'] = {
      para: 'admyo',
      metodo: 'Tarjeta',
      nombre: this.get_form['Nombre'].value,
      apellidos: this.get_form['Apellidos'].value,
      total: this.costo_plan,
      correo: this.get_form['Correo'].value,
      planid: this.datos_pago['planID'],
      tiempo: this.datos_pago['tiempo']
    };
    const tokenParams = {
      'card': {
        'number': this.get_form['Tarjeta'].value,
        'name': this.get_form['Nombre'].value + ' ' + this.get_form['Apellidos'].value,
        'exp_year': this.get_form['Anio'].value,
        'exp_month': this.get_form['Mes'].value,
        'cvc': this.get_form['CVV'].value,
      }
    };
    this.http_services.preloadEvent$.emit(true);
    await Conekta.token.create(tokenParams, (data) => {
      this.http_services.preloadEvent$.emit(false);
      this.pago_general['datos_pago']['TarjetaToken'] = data['id'];
      this.enviar_pago();
      console.log(this.pago_general);
    }, (error) => {
        this.http_services.preloadEvent$.emit(false);
        switch (error.code) {
          case 'invalid_number':
            Swal.fire('Error', error.message_to_purchaser, 'error');
            break;
          case 'expired_card':
            Swal.fire('Error', error.message_to_purchaser, 'error');
            break;
          case 'invalid_cvc':
            Swal.fire('Error', error.message_to_purchaser, 'error');
            break;
        }
    });
  }
  enviar_pago() {
    const form = new FormData();
    form.append('nombre', this.pago_general['datos_pago']['nombre'] + ' ' + this.pago_general['datos_pago']['apellidos']);
    form.append('token', this.pago_general['datos_pago']['TarjetaToken']);
    form.append('total', this.pago_general['datos_pago']['total']);
    form.append('correo', this.pago_general['datos_pago']['correo']);
    form.append('planid', this.datos_pago['planID']);
    form.append('tiempo', this.datos_pago['tiempo']);
    form.append('costo', this.datos_pago['costo']);
    form.append('IDEmpresa', this.datos_user['IDEmpresa']);
    this.http_services.ngchangeplan(form)
      .subscribe(data => {
        Swal.fire('Exito', 'Datos Actualizados', 'success');
      }, (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Error al pagar', 'error');
          console.log(error);
      });
  }
}
