import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-imgagen',
  templateUrl: './page-imgagen.component.html',
  styleUrls: ['./page-imgagen.component.scss']
})
export class PageImgagenComponent implements OnInit {
 
  constructor(

  ) {

    
  }

  ngOnInit(): void {
  }
  getAll(tiempo) {
    console.log(tiempo);
  }
}
