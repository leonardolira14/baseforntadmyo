import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosdetailsComponent } from './graficosdetails.component';

describe('GraficosdetailsComponent', () => {
  let component: GraficosdetailsComponent;
  let fixture: ComponentFixture<GraficosdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
