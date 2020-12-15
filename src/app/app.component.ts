import { Component } from '@angular/core';
import { Serviecokie } from './library/servercokie';
import { EventsServiceService } from './services/events-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  logueado = false;
  constructor(
    private service_cookie: Serviecokie,
    private http: EventsServiceService
  ) {
    if (this.service_cookie.getCokie('data_user')) {
      this.logueado = true;
    }
    this.http.Cambio_menu$.subscribe(data => {
      this.logueado = data;
    });
  }
}
