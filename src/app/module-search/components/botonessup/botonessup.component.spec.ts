import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonessupComponent } from './botonessup.component';

describe('BotonessupComponent', () => {
  let component: BotonessupComponent;
  let fixture: ComponentFixture<BotonessupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonessupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonessupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
