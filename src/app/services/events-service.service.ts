import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  preloadEvent$ = new EventEmitter<boolean>();
  IDEmpresa$ = new EventEmitter<any>();
  periodoImagen$ = new EventEmitter<any>();
  TipoImagen$ = new EventEmitter<any>();
  constructor() { }
}
