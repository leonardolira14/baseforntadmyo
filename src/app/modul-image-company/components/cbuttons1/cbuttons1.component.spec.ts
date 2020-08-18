import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cbuttons1Component } from './cbuttons1.component';

describe('Cbuttons1Component', () => {
  let component: Cbuttons1Component;
  let fixture: ComponentFixture<Cbuttons1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cbuttons1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cbuttons1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
