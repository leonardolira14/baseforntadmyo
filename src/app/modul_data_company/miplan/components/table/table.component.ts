import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  gratis_Bolean = true;
  micro_Bolean = false;
  empresa_Bolean = false;
  micro_radio = 200;
  empresa_radio = 1000;
  constructor() { }

  ngOnInit(): void {
  }
  cambio_plan(plan) {
    if (plan==='G') {
      this.gratis_Bolean = true;
      this.micro_Bolean = false;
      this.empresa_Bolean = false;
    }
    if (plan === 'M') {
      this.gratis_Bolean = false;
      this.micro_Bolean = true;
      this.empresa_Bolean = false;
    }
    if (plan === 'E') {
      this.gratis_Bolean = false;
      this.micro_Bolean = false;
      this.empresa_Bolean = true;
    }
  }
}
