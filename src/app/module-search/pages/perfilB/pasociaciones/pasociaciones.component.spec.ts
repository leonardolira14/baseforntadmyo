import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasociacionesComponent } from './pasociaciones.component';

describe('PasociacionesComponent', () => {
  let component: PasociacionesComponent;
  let fixture: ComponentFixture<PasociacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasociacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasociacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
