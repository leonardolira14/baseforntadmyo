import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaimgComponent } from './mapaimg.component';

describe('MapaimgComponent', () => {
  let component: MapaimgComponent;
  let fixture: ComponentFixture<MapaimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
