import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../services/events-service.service';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  constructor(
    private servive_events: EventsServiceService
  ) { }

  ngOnInit(): void {
    this.servive_events.preloadEvent$.emit(false);
  }

}
