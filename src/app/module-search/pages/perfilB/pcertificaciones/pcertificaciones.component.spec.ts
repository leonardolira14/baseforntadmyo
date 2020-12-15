import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcertificacionesComponent } from './pcertificaciones.component';

describe('PcertificacionesComponent', () => {
  let component: PcertificacionesComponent;
  let fixture: ComponentFixture<PcertificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcertificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcertificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
