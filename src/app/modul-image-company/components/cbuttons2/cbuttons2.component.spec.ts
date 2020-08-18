import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cbuttons2Component } from './cbuttons2.component';

describe('Cbuttons2Component', () => {
  let component: Cbuttons2Component;
  let fixture: ComponentFixture<Cbuttons2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cbuttons2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cbuttons2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
