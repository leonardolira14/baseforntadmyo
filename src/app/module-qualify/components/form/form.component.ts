import { GirosServiceService } from './../../../services/data_company/giros-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { QualifyServicesService } from '../../../services/module-services/qualify/qualify-services.service';
import { EventsServiceService } from '../../../services/events-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  modal_precalif = false;
  valora = '';
  tipo = '';
  form_qualify: FormGroup;
  subttmited = false;
  options: string[] = ['One', 'Two', 'Three'];
  Giros = [];
  SubSectores = [];
  Ramas = [];
  Empresas = [];
  Usuarios = [];
  filteredOptions: Observable<string[]>;
  fileterUsuarios: Observable<string[]>;
  constructor(
    private _adapter: DateAdapter<any>,
    private ruta_activa: ActivatedRoute,
    private formBuild: FormBuilder,
    private http: QualifyServicesService,
    private http_services: EventsServiceService,
    private http_giros:GirosServiceService
  ) {
    this._adapter.setLocale('es');
    this.ruta_activa.params.subscribe(data => {
      if (data['como']) {
        this.tipo = data['como'];
        this.ngValora();
      }
      if (data['valora']) {
        this.valora = data['valora'];
        this.ngRevalora();
      }
    });
    this.form_qualify = this.formBuild.group({
      RazonSocial: ['', Validators.required],
      Correo: ['', Validators.required],
      RFC: ['', Validators.required],
      Fecha: ['', Validators.required],
      Giro: ['', Validators.required],
      SubGiro: [''],
      Rama: [''],
      IDReceptor: [''],
      Tipo: [this.tipo]
    });
   }

  ngOnInit(): void {
    this.http_services.preloadEvent$.emit(true);
    this.http.ngGetdata()
      .subscribe(data => {
        console.log(data);
        this.http_services.preloadEvent$.emit(false);
        this.Giros = data['Giros'];
        this.Empresas = data['Empresas'];
      }, error => {
        this.http_services.preloadEvent$.emit(false);
        console.log(error);
      });
    this.filteredOptions = this.form_qualify.controls['RazonSocial'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.fileterUsuarios = this.form_qualify.controls['Correo'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterUser(value))
    );

  }
  private _filterUser(value: string): string[]{
    const filterValue = value.toLowerCase();
    return this.Usuarios.filter(item => item.Correo.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.Empresas.filter(item => item.RazonSocial.toLowerCase().indexOf(filterValue) === 0);
  }

  get from_get_data() {
    return this.form_qualify.controls;
  }
  ngRevalora() {
    console.log(this.valora);
  }
  ngValora() {
    console.log(this.tipo);
  }
  select_empresa(IDEmpresa) {
    this.http_services.preloadEvent$.emit(true);
    this.Empresas.forEach(element => {
      if (element.id === IDEmpresa) {
        this.form_qualify.controls['RFC'].setValue(element.Rfc);
        this.form_qualify.controls['IDReceptor'].setValue(element.id);
        return;
      }
    });
    const datos =  IDEmpresa ;
    this.http.ngGetDataQualify(datos)
      .subscribe(data => {
        console.log(data);
        this.SubSectores = data['subgiros'];
        this.Ramas = data['ramas'];
        this.Usuarios = data['Usuarios'];
        if(data['GiroPrincipal'].length>0){
          this.form_qualify.controls['Giro'].setValue(data['GiroPrincipal'][0]['Giro'][0]['_id']);
          this.form_qualify.controls['SubGiro'].setValue(data['GiroPrincipal'][0]['SubGiro'][0]['_id']);
          this.form_qualify.controls['Rama'].setValue(data['GiroPrincipal'][0]['Rama'][0]['_id']);
        }
        
        this.http_services.preloadEvent$.emit(false);
      }, error => {
        this.http_services.preloadEvent$.emit(false);
        console.log(error);
      });
  }
  addEvent(event, index) {
    let dia = '';
    let mes = '';
    (index.value._i.date < 10) ? dia = '0' + index.value._i.date : dia = index.value._i.date;
    (index.value._i.month < 9) ? mes = '0' + (index.value._i.month + 1) : mes = (index.value._i.month + 1);
    this.form_qualify.controls['Fecha'].setValue(index.value._i.year + '-' + mes + '-' + dia);
  }

  // funcion para selccionar los subgiros
  ngGetSubgiro() {
    this.http_services.preloadEvent$.emit(true);
    const giro =   this.form_qualify.controls['Giro'].value;
    this.http_giros.getallsubsector(giro)
      .subscribe(data => {
        console.log(data);
        this.http_services.preloadEvent$.emit(false);
        this.SubSectores = data['subgiros'];
      });
  }
  ngGetRamas() {
    this.http_services.preloadEvent$.emit(true);
    const Subgiro = this.form_qualify.controls['SubGiro'].value;
    this.http_giros.getrama(Subgiro)
      .subscribe(data => {
        this.http_services.preloadEvent$.emit(false);
        this.Ramas = data['ramas'];
      }, error => {
        this.http_services.preloadEvent$.emit(false);
        console.log(error);
      });
  }
  ngSelecciona() {
    this.form_qualify.controls['Tipo'].setValue(this.tipo);
    console.log(this.form_qualify.value);

    if (this.form_qualify.controls['IDReceptor'].value === '') {
      this.modal_precalif = true;
    } else {
      this.nggetCustionario();
    }
  }
  nggetCustionario() {
    this.modal_precalif = false;
    console.log(this.form_qualify.value);
    this.subttmited = true;
    if (this.form_qualify.controls['Fecha'].value === '') {
      const date = new Date();
      let dia ;
      let mes ;
      (date.getDay() < 10) ? dia = '0' + date.getDay() : dia = date.getDay();
      (date.getMonth() < 9) ? mes = '0' + (date.getMonth() + 1) : mes = (date.getMonth() + 1);
      this.form_qualify.controls['Fecha'].setValue(date.getFullYear() + '-' + mes + '-' + dia);
    }
    if (this.form_qualify.valid) {
      this.http.FormCuestionario$.emit(this.form_qualify.value);
    } else {
      this.subttmited = true;
    }
  }

}
