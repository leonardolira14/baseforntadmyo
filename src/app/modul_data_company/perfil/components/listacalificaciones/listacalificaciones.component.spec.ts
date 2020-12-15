import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacalificacionesComponent } from './listacalificaciones.component';

describe('ListacalificacionesComponent', () => {
  let component: ListacalificacionesComponent;
  let fixture: ComponentFixture<ListacalificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacalificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
