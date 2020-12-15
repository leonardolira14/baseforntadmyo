import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-perfilmenu',
  templateUrl: './perfilmenu.component.html',
  styleUrls: ['./perfilmenu.component.scss']
})
export class PerfilmenuComponent implements OnInit {
  idempresa = '';
  constructor(
    private ruta_activa: ActivatedRoute
  ) {
    this.ruta_activa.params.subscribe(data => {
      this.idempresa = data['empresa'];
    })
   }

  ngOnInit(): void {
  }

}
