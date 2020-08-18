import { Component, OnInit } from '@angular/core';
import { QualifyServicesService } from '../../../services/qualify/qualify-services.service';
import { EventsServiceService } from '../../../services/events-service.service';
import { Serviecokie } from '../../../library/servercokie';
import { Router } from '@angular/router';
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
    const datos = { Emisor: { IDEmpresa: this.data_emisor['IDEmpresa'] }, Receptor: this.data_receptor, Tipo: this.Tipo };
    this.http.ngGetCuestionario(datos)
      .subscribe(data => {
        this.cuestionario_calidad = data['response']['result']['Preguntas']['Calidad'];
        this.cuestionario_cumplimiento = data['response']['result']['Preguntas']['Cumplimiento'];
        this.cuestionario_oferta = data['response']['result']['Preguntas']['Oferta'];
        this.cuestionario_recomendacion = data['response']['result']['Preguntas']['Recomendacion'];
        this.listas_dependencias = data['response']['result']['listas_dependencias'];
        console.log(data);
      }, error => {
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
    if (dedonde === 'oferta') {
      lista = this.cuestionario_oferta;
    }
    if (dedonde === 'recomendacion') {
      lista = this.cuestionario_oferta;
    }
    console.log(lista, dedonde);
    this.listas_dependencias.forEach(element => {
      lista.forEach(pag => {
        if (pag.Nump === element.ID_Pregunta) {
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
      recomendacion: this.cuestionario_recomendacion,
      
    };
    const datosEmisor = {
      Correo: this.data_user['Correo'],
      IDUsuario: this.data_user['IDUsuario'],
      IDEmpresa: this.data_emisor['IDEmpresa']
    };
    this.model_calificar['Emisor'] = datosEmisor;
    this.model_calificar['Receptor'] = this.data_receptor;
    this.model_calificar['Tipo'] = this.Tipo;
    this.http_services.preloadEvent$.emit(true);
    this.http.ngcalifcar(this.model_calificar)
      .subscribe(data => {
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
    window.location.reload()
  }
}
