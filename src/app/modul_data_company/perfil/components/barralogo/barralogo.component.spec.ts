import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarralogoComponent } from './barralogo.component';

describe('BarralogoComponent', () => {
  let component: BarralogoComponent;
  let fixture: ComponentFixture<BarralogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarralogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarralogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
