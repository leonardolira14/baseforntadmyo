import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PusuariosComponent } from './pusuarios.component';

describe('PusuariosComponent', () => {
  let component: PusuariosComponent;
  let fixture: ComponentFixture<PusuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PusuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
