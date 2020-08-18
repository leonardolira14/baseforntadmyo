import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcertificationComponent } from './cardcertification.component';

describe('CardcertificationComponent', () => {
  let component: CardcertificationComponent;
  let fixture: ComponentFixture<CardcertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardcertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardcertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
