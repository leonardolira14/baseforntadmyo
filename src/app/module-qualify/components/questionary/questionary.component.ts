import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QualifyServicesService } from '../../../services/module-services/qualify/qualify-services.service';
import { EventsServiceService } from '../../../services/events-service.service';
import { Serviecokie } from '../../../library/servercokie';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.scss']
})
export class QuestionaryComponent implements OnInit {
  data_receptor = [];
  data_emisor = [];
  data_user = [];
  Tipo = '';
  modal_calif = false;
  calificacion = '';
  public model_calificar: any = {};
  public cuestionario_calidad: any[] = [];
  public cuestionario_cumplimiento: any[] = [];
  public cuestionario_sanidad: any[] = [];
  public cuestionario_socioambiental: any[] = [];
  public cuestionario_oferta: any[] = [];
  public cuestionario_recomendacion: any[] = [];
  public listas_dependencias: any[] = [];
  public lista_respuestas: any[] = [];
  constructor(
    private Route: Router,
    private http: QualifyServicesService,
    private http_services: EventsServiceService,
    private service_cookie: Serviecokie
  ) {
    this.data_emisor = this.service_cookie.getCokie('data_company');
    this.data_user = this.service_cookie.getCokie('data_user');
    this.http.FormCuestionario$.subscribe(data => {
      this.data_receptor = data;
      this.getCuestionario();
    });
   }

  ngOnInit(): void {
  }
  getCuestionario() {
    this.Tipo = this.data_receptor['Tipo'];
    this.http.ngGetCuestionario(this.data_receptor)
      .subscribe(data => {
        console.log(data);
        this.cuestionario_calidad = data['cuestionario'][0]['Calidad'];
        this.cuestionario_cumplimiento = data['cuestionario'][0]['Cumplimiento'];
        if(data['cuestionario'][0]['Oferta']){
          this.cuestionario_oferta = data['cuestionario'][0]['Oferta'];
        }
        
        this.cuestionario_recomendacion = data['cuestionario'][0]['Recomendacion'];
        this.cuestionario_sanidad = data['cuestionario'][0]['Sanidad'];
        this.cuestionario_socioambiental = data['cuestionario'][0]['Socioambiental'];
        this.listas_dependencias = data['listas_dependencias'];
        console.log(data);
      }, (error:HttpErrorResponse) => {
        if(error.status === 404){
          if (error.error.code === 1991){
            Swal.fire('Error','No puede calificar a su misma empresa','error');
            
          }
        }
        if(error.status === 500){
         
            Swal.fire('Error','Hay problemas en el servidor favor de contactar a sooporte','error');          
        }
          console.log(error);
    });
  }
  ver_dependencia(index, dedonde) {

    let lista = [];
    if (dedonde === 'calidad') {
      lista = this.cuestionario_calidad;
    }
    if (dedonde === 'cumplimiento') {
      lista = this.cuestionario_cumplimiento;
    }
    if (dedonde === 'sanidad') {
      lista = this.cuestionario_sanidad;
    }
    if (dedonde === 'socioambiental') {
      lista = this.cuestionario_socioambiental;
    }
    if (dedonde === 'oferta') {
      lista = this.cuestionario_oferta;
    }
    if (dedonde === 'recomendacion') {
      lista = this.cuestionario_oferta;
    }
    console.log(lista, dedonde);
    this.listas_dependencias.forEach(element => {
      lista.forEach(pag => {
        if (pag._id === element._id) {
          const elementi = document.getElementById(element.S_ID_Pregunta);
          if (pag.Respuesta_usuario === element.Respuesta) {
            elementi.classList.remove('d-none');
          } else {
            elementi.classList.add('d-none');
          }
        }
      });
    });
  }
  enviar_cuestion() {
    this.model_calificar['cuestionarios'] = {
      calidad: this.cuestionario_calidad,
      cumplimiento: this.cuestionario_cumplimiento,
      oferta: this.cuestionario_oferta,
      sanidad: this.cuestionario_sanidad,
      socioambiental: this.cuestionario_socioambiental,
      recomendacion: this.cuestionario_recomendacion,
    };

    this.model_calificar['Receptor'] = this.data_receptor;
    this.model_calificar['Tipo'] = this.Tipo;
    this.http_services.preloadEvent$.emit(true);
    this.http.ngcalifcar(this.model_calificar)
      .subscribe(data => {
        console.log(data)
        this.calificacion = data['mensaje'];
        this.modal_calif = true;
        this.http_services.preloadEvent$.emit(false);
        console.log(data);
      }, error => {
        this.http_services.preloadEvent$.emit(false);
        console.log(error);
      });
  }
  ngir(ir) {
    this.Route.navigateByUrl('' + ir);
  }
  reacatuliza() {
    window.location.reload();
  }
}
