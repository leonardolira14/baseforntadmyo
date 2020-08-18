import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../services/events-service.service';
@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.scss']
})
export class PreloadComponent implements OnInit {
  preload_bolean = true;
  constructor(
    private http_service: EventsServiceService
  ) {
    this.http_service.preloadEvent$.subscribe(data => {
      this.preload_bolean = data;
    });
  }

  ngOnInit(): void {
  }

}
