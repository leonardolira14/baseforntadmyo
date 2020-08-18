import { Component, OnInit } from '@angular/core';
import { Serviecokie } from '../../../../library/servercokie';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceDataCompanyService } from '../../../../services/service-data-company.service';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../../services/events-service.service';
@Component({
  selector: 'app-data-company',
  templateUrl: './data-company.component.html',
  styleUrls: ['./data-company.component.scss']
})
export class DataCompanyComponent implements OnInit {
  ivalid = false;
  text_alert = 'Algunos de los campos parecen incompletos. Error al cargar los datos.';
  subttmited = false;
  url_server = environment.url_serve;
  form_company: FormGroup;
  data_company: any;
  data_user: [];
  tipoempresas: [];
  noempleados: [];
  factanual: [];
  estados: [];
  marcas: [];
  tel1: [];
  tel2: [];
  tel3: [];
  normas: [];
  filemarcalogo: File = null;
  logitomarca: any;
  public imagePath;
  constructor(
    private http_services: EventsServiceService,
    private formBuilder: FormBuilder,
    private service_cokie: Serviecokie,
    private http: ServiceDataCompanyService
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.data_company = this.service_cokie.getCokie('data_company');
    this.tel1 = JSON.parse(this.data_company['Tel1']);
    this.tel2 = JSON.parse(this.data_company['Tel2']);
    this.tel3 = JSON.parse(this.data_company['Tel2']);
    console.log(this.tel1);
    this.form_company = this.formBuilder.group({
      razon_social: [this.data_company['Razon_Social'], Validators.required],
      nombre_comercial: [this.data_company['Nombre_Comer'], Validators.required],
      rfc: [this.data_company['RFC'], Validators.required],
      tempresa: [this.data_company['TipoEmpresa'], Validators.required],
      nempleados: [this.data_company['NoEmpleados'], Validators.required],
      facanual: [this.data_company['FacAnual'], Validators.required],
      diaspagoempresa: [this.data_company['DiasPago']],
      perfil: [this.data_company['Perfil'], Validators.required],
      Sitio_Web: [this.data_company['Sitio_Web'], Validators.required],
      Estado: [this.data_company['Estado'], Validators.required],
      Deleg_Mpo: [this.data_company['Deleg_Mpo'], Validators.required],
      Colonia: [this.data_company['Colonia'], Validators.required],
      Codigo_Postal: [this.data_company['Codigo_Postal'], Validators.required],
      Direc_Fiscal: [this.data_company['Direc_Fiscal'], Validators.required],
      Tel1: new FormGroup({
        TelP: new FormControl(this.tel1['Tel']),
        TTelP: new FormControl(this.tel1['Tipo']),
      }),
      Tel2: new FormGroup({
        Tel2: new FormControl(this.tel2['Tel']),
        TTel2: new FormControl(this.tel2['Tipo']),
      }),
      Tel3: new FormGroup({
        Tel3: new FormControl(this.tel2['Tel']),
        TTel3: new FormControl(this.tel2['Tipo']),
      }),

    });
    this.ngSeleclogo();
    this.ngPerfil();
  }

  ngOnInit(): void {
    console.log();
  }
  get get_form_Data() {
    return this.form_company.controls;
  }
  ngPerfil() {
    console.log(this.data_company);
    const empresa = { empresa: this.data_company['IDEmpresa'], token: this.service_cokie.getCokie('token') };
    this.http.getperfilempresa(empresa)
      .subscribe(data => {
        console.log(data);
        this.tipoempresas = data['response']['result']['tipoempresas'];
        this.noempleados = data['response']['result']['noempleados'];
        this.factanual = data['response']['result']['factanual'];
        this.estados = data['response']['result']['Estados'];
        this.marcas = data['response']['result']['marcas'];
        this.normas = data['response']['result']['Normas']
        console.log(data);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }

  // seleccionar logo de empresa
  ngSeleclogo() {
    const iconog = '/assets/icons/AMY_Photo.svg';
    const cade = this.url_server + 'assets/img/logosEmpresas/' + this.data_company['Logo'];
    if (this.data_company['Logo'] === '') {
      this.logitomarca = iconog;
    } else {
      this.logitomarca = cade;
    }
  }
  ngSelectLogoCer(logo) {
    const iconog = '/assets/icons/AMY_Photo.svg';
    const cade = this.url_server + 'assets/certificaciones/' + logo;
    if (logo === '') {
      return iconog;
    } else {
      return cade;
    }
  }

  ngEnviarFormulario() {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }

    if (this.form_company.valid) {
      this.http_services.preloadEvent$.emit(true);
      this.subttmited = false;
      this.ivalid = false;
      this.form_company.addControl('token', new FormControl(this.service_cokie.getCokie('data_company')));
      this.form_company.addControl('IDEmpresa', new FormControl(this.data_company['IDEmpresa']));
      this.http.updateempresa(this.form_company.value)
        .subscribe(data => {
          alert('datos Actualizados');
          console.log(data);
        }, (error: HttpErrorResponse) => {
          this.http_services.preloadEvent$.emit(false);
          alert('algo paso ' + error.message + ' Status: ' + error.status);
          console.log(error);
          console.log(error.error, error.status);
        }, () => this.http_services.preloadEvent$.emit(false));
    } else {
      this.ivalid = true;
      this.subttmited = true;
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
    this.filemarcalogo = <File>files[0];
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logitomarca = reader.result;
      this.ngChangelogo();
    };
  }
  ngChangelogo() {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    const confirmi = confirm("quieres cambiar el logo");
    if (!confirmi) {
      this.ngSeleclogo();
    } else {
      this.http_services.preloadEvent$.emit(true);
      const form = new FormData();
      form.append('Logo', this.filemarcalogo);
      form.append('IDEmpresa', this.data_company['IDEmpresa']);
      form.append('token', this.service_cokie.getCokie('token') );
      this.http.updatelogoempresa(form)
        .subscribe(data => {
          if (data['code'] === 0) {
            this.data_company['Logo'] = data['Logo'];
            this.service_cokie.setCookie('data_company', this.data_company);
            
            alert('Logo actualizado');
          } else {
            alert('algo paso');
          }
        }, (error: HttpErrorResponse) => {
          this.http_services.preloadEvent$.emit(false);
          alert('algo paso ' + error.message + ' Status: ' + error.status);
          console.log(error);
          console.log(error.error, error.status);
        }, () => this.http_services.preloadEvent$.emit(false));
    }
  }
}
