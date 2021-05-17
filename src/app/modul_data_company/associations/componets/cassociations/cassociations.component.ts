import { Component, OnInit } from '@angular/core';
import { AsociacionServiceService } from '../../../../services/data_company/asociacion-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serviecokie } from '../../../../library/servercokie';
import { Asociacioninterface } from '../../models/asociation-interface'
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-cassociations',
  templateUrl: './cassociations.component.html',
  styleUrls: ['./cassociations.component.scss']
})
export class CassociationsComponent implements OnInit {
  submitted = false;
  ivalid = false;
  text_alert = 'Algunos de los campos parecen incompletos. Por favor revisalos y revisa la información correspondiente.';
  form_asociacion: FormGroup;
  filemarcalogo: File = null;
  imagePath: any;
  nombreFile: any;
  data_company: [];
  data_user: [];
  estados: [];
  Lita_Asociation = [];
  token = '';
  logitomarca: any = '/assets/img/foto-no-disponible.jpg';
  url_server = environment.url_serve;
  ietm:any = [];
  constructor(
    private htt_services: EventsServiceService,
    private http: AsociacionServiceService,
    private formBuild: FormBuilder,
    private service_cookie: Serviecokie,
    private DomSanitizer : DomSanitizer
  ) {
    this.data_company = this.service_cookie.getCokie('data_company');
    this.data_user = this.service_cookie.getCokie('data_user');
    this.token = this.service_cookie.getCokie('token');
    this.form_asociacion = this.formBuild.group({
      Nombre: ['', Validators.required],
      Siglas: ['', Validators.required],
      Web: ['', Validators.required],
      Telefono: ['', Validators.required],
      Direccion: ['', Validators.required],
      Colonia: [''],
      Municipio: [''],
      Estado: [''],
      CP: [''],
      id: [''],    
      Imagen: [''],
      IDRelacion:['']
      
    });
    this.http.Certification$.subscribe(data => {
      this.ngPutdata(data);
    });
    
  }

  get from_get_data() {
    return this.form_asociacion.controls;
  }
  ngOnInit(): void {
    this.getlist();
  }
getlist(){
  this.http.nggetlist()
  .subscribe(data=>{
    this.Lita_Asociation = data['data'];
    this.estados = data['estados'];
    console.log(data);
  },(error:HttpErrorResponse)=>{
    console.log(error);
    Swal.fire('Error',error.error.msg,'info');
  })
}

search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.Lita_Asociation.filter(v => v.Nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    formatter = (result: {Nombre: string}) =>result.Nombre|| '';
    itemselec(index){
      console.log(index);
      this.form_asociacion.patchValue(index.item);
      
      console.log(this.form_asociacion.value);
      this.ietm = index.item;
      this.selectlogo(index.item.Imagen)
    }
    rt = (ers)=>ers.Nombre;
    selectlogo(logo_){
      console.log(logo_)
      if (logo_ === '' || logo_ === null || logo_ === undefined) {
        this.logitomarca ='/assets/img/foto-no-disponible.jpg';
        } else {
          this.logitomarca = logo_;
        }
        console.log(this.logitomarca);
        return this.logitomarca;
    }
  ngSelect() {
    if(this.ietm.length === 0){
      this.ietm = this.form_asociacion.value;
    }
    this.ivalid = false;
    this.submitted = true;
    if (this.form_asociacion.invalid) {
      this.ivalid = true;
      this.text_alert = 'Algunos de los campos parecen incompletos. Por favor revisalos y revisa la información correspondiente.';
    } else {
      
      let formdata = new FormData();
      console.log('entra');
      formdata.append('Nombre',this.ietm.Nombre);
      formdata.append('Siglas',this.ietm.Siglas);
      formdata.append('Web', this.ietm.Web);
      formdata.append('Telefono', this.ietm.Telefono);
      formdata.append('Direccion', this.ietm.Direccion);
      formdata.append('Colonia',this.ietm.Colonia);
      formdata.append('Municipio', this.ietm.Municipio);
      formdata.append('Estado', this.ietm.Estado);
      formdata.append('id', this.ietm.id);
      if(this.filemarcalogo){
        formdata.append('Imagen', this.filemarcalogo,this.filemarcalogo.name);
      }else{
        formdata.append('Imagen', this.ietm.Imagen);
      }
      console.log(formdata);
     // if (this.from_get_data['id'].value === '') {
       
        this.ngAddAsociacion(formdata);
      /*} else {
        this.ngUpdate(formdata);
      }*/
      this.submitted = false;
      this.ivalid = false;
    }
  }
  ngAddAsociacion(datos) {
   // this.htt_services.preloadEvent$.emit(true);
   
    this.http.ngAdd(datos)
      .subscribe(data => {
        this.http.NewCertification$.emit(true);
        Swal.fire('Exito','Asociación registrada','success');
        this.ietm = [];
        this.form_asociacion.reset();
      }, (error: HttpErrorResponse) => {
        this.htt_services.preloadEvent$.emit(false);
        Swal.fire('Error',error.message,'error');
        console.log(error);
        console.log(error.error, error.status);
      }, () => {
        this.htt_services.preloadEvent$.emit(false);
      });
  }
  ngUpdate(datos) {
    this.htt_services.preloadEvent$.emit(true);
    this.http.ngUpdate(datos,'')
      .subscribe(data => {
        this.http.NewCertification$.emit(true);
      }, (error: HttpErrorResponse) => {
        this.htt_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => {
        this.htt_services.preloadEvent$.emit(false);
      });
  }
  ngPutdata(data) {
    console.log(data);
    this.from_get_data['Nombre'].setValue(data['Nombre']);
    this.from_get_data['Siglas'].setValue(data['Siglas']);
    this.from_get_data['Web'].setValue(data['Web']);
    this.from_get_data['Tel'].setValue(data['Telefono']);
    this.from_get_data['Calle'].setValue(data['Direccion']);
    this.from_get_data['Colonia'].setValue(data['Colonia']);
    this.from_get_data['Municipio'].setValue(data['Municipio']);
    this.from_get_data['Estado'].setValue(data['Estado']);
    this.from_get_data['CP'].setValue(data['CP']);
    this.from_get_data['IDAsociacion'].setValue(data['IDAsociacion']);
    this.from_get_data['IDAsocia'].setValue(data['IDAsocia']);
    this.from_get_data['IDEmpresa'].setValue(data['IDEmpresa']);
    this.from_get_data['Archivo'].setValue(data['Imagen']);
    if (data['Imagen'] !== null) {
      this.logitomarca = this.url_server + 'assets/img/asociaciones/' + data['Imagen'];
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
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logitomarca = reader.result;
    };
  }

}
