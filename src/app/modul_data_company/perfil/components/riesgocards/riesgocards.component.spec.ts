import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgocardsComponent } from './riesgocards.component';

describe('RiesgocardsComponent', () => {
  let component: RiesgocardsComponent;
  let fixture: ComponentFixture<RiesgocardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiesgocardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiesgocardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
