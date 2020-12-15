import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {
  palabra = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  buscar(event) {
    if (event.key === 'Enter') {
      this.router.navigateByUrl('/busqueda/search/' + this.palabra);
    }
  }

}
