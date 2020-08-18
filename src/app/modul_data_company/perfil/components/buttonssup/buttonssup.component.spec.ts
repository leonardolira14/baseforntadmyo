import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonssupComponent } from './buttonssup.component';

describe('ButtonssupComponent', () => {
  let component: ButtonssupComponent;
  let fixture: ComponentFixture<ButtonssupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonssupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonssupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
