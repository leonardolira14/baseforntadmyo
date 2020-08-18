import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapaimg',
  templateUrl: './mapaimg.component.html',
  styleUrls: ['./mapaimg.component.scss']
})
export class MapaimgComponent implements OnInit {
  tipContent = '';
  constructor() { }

  ngOnInit(): void {
  }
  dinombre(title) { 
    this.tipContent = title;
    console.log(title);
  }
}
