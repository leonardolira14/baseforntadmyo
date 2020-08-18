import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloandingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];
  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      // agrego el path de la ruta para precargar el modulo
      this.preloadedModules.push[route.path];
      // log the route path the console
      console.log('Preload', route.path);
      return load();
    } else {
      return of(null);
    }

  }
}
