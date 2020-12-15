import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmarcasComponent } from './pmarcas.component';

describe('PmarcasComponent', () => {
  let component: PmarcasComponent;
  let fixture: ComponentFixture<PmarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
