import { Component, OnInit } from '@angular/core';
import { Serviecokie } from '../../../../library/servercokie';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceDataCompanyService } from '../../../../services/service-data-company.service';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../../services/events-service.service';
import Swal from 'sweetalert2';
import {DomSanitizer} from '@angular/platform-browser';
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
    private http: ServiceDataCompanyService,
    private DomSanitizer : DomSanitizer
  ) {
    this.http_services.preloadEvent$.emit(true);
    
    console.log(this.tel1);
    this.form_company = this.formBuilder.group({
      RazonSocial: ['', Validators.required],
      NombreComercial: ['',Validators.required],
      Rfc: ['', Validators.required],
      TipoEmpresa: ['', Validators.required],
      NoEmpleados: ['', Validators.required],
      FacAnual: ['', Validators.required],
      Diaspago: [''],
      Perfil: ['', Validators.required],
      Estatus: [''],
      Logo:[''],
      Contacto: this.formBuilder.group({
        Web: [''],
        Faceboock:[''],
      }),
      Direccion: this.formBuilder.group({
        CalleNumero: [''],
        Estado: ['',Validators.required],
        Municipio: ['',Validators.required],
        Colonia: [''],
        Cp: ['']
      }),
      Telefono: this.formBuilder.group({
          TelefonoP: this.formBuilder.group({
            Numero: [''],
            Tipo: ['']
          }),
          TelefonoD: this.formBuilder.group({
            Numero: [''],
            Tipo: ['']
          }),
          TelefonoT: this.formBuilder.group({
            Numero: [''],
            Tipo: ['']
          }),

      }),

    });
    //this.ngSeleclogo();
    this.ngPerfil();
  }

  ngOnInit(): void {
    console.log();
  }
  get get_form_Data() {
    return this.form_company.controls;
  }
  get Direccion_get(){
    return this.form_company.controls['Direccion']['controls'];
  }
  ngPerfil() {
   
   this.http.getdatacompany()
   .subscribe(data=>{
     console.log(data);
     
    this.http_services.preloadEvent$.emit(false);
    this.estados = data['listestados'];
    this.marcas = data['marcas'];
    this.normas  = data['certificaciones'];
    this.tipoempresas = data['tiposEmpresa'];
    this.factanual = data['lisfacturacion'];
    this.noempleados  =data['lisempleados'];
    this.form_company.patchValue(data['empresa']);
    if(this.form_company.controls['Logo'].value){
      this.logitomarca = this.DomSanitizer.bypassSecurityTrustUrl(this.form_company.controls['Logo'].value);
    }else{
      this.logitomarca = '/assets/icons/AMY_Photo.svg';
    }
    
    
   },(error:HttpErrorResponse)=>{
     this.http_services.preloadEvent$.emit(false);
     if(error.status === 400){
      Swal.fire('Error',error.error.msg,'error');
     }
     if(error.status === 404){
      Swal.fire('Error',error.error.msg,'error');
     }
     if(error.status === 500){
      Swal.fire('Error','Error al obtener información, contacta al adminstrador','error');
     }
     console.log(error);
   })
  
  }

  // seleccionar logo de empresa
  ngSeleclogo(logo) {
    
    if(!logo){
      console.log('sdfsdf')
      this.logitomarca='/assets/icons/AMY_Photo.svg'; 
    }else{
      this.logitomarca = logo;
    }
  }


  ngSelectLogoCer(logo) {
    if(!logo){
      console.log('sdfsdf')
      return'/assets/icons/AMY_Photo.svg'; 
    }else{
      return logo;
    }
  }

  ngEnviarFormulario() {
  
    if (this.form_company.valid) {
      this.http_services.preloadEvent$.emit(true);
      this.subttmited = false;
      this.ivalid = false;
      this.http.updateempresa(this.form_company.value)
        .subscribe(data => {
          Swal.fire('Exito','Datos actualizados','success');
        }, (error: HttpErrorResponse) => {
          this.http_services.preloadEvent$.emit(false);
          alert('algo paso ' + error.message + ' Status: ' + error.status);
          console.log(error);
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
   
    const confirmi = confirm("quieres cambiar el logo");
    if (!confirmi) {
      this.ngSeleclogo('');
    } else {
      this.http_services.preloadEvent$.emit(true);
      const form = new FormData();
      form.append('Logo', this.filemarcalogo);
      this.http.updatelogoempresa(form)
        .subscribe(data => {
          console.log(data);
          this.http_services.preloadEvent$.emit(false);
          this.form_company.patchValue(data['data']);
          Swal.fire('Exito','Logo actualizado','success');
           
        }, (error: HttpErrorResponse) => {
          this.http_services.preloadEvent$.emit(false);
          alert('algo paso ' + error.message + ' Status: ' + error.status);
          console.log(error);
          console.log(error.error, error.status);
        }, () => this.http_services.preloadEvent$.emit(false));
    }
  }
}
