import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosdetallesComponent } from './filtrosdetalles.component';

describe('FiltrosdetallesComponent', () => {
  let component: FiltrosdetallesComponent;
  let fixture: ComponentFixture<FiltrosdetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosdetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosdetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
