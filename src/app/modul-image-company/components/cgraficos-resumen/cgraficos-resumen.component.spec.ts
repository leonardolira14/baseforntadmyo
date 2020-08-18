import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgraficosResumenComponent } from './cgraficos-resumen.component';

describe('CgraficosResumenComponent', () => {
  let component: CgraficosResumenComponent;
  let fixture: ComponentFixture<CgraficosResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgraficosResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgraficosResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
