import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardfollowComponent } from './cardfollow.component';

describe('CardfollowComponent', () => {
  let component: CardfollowComponent;
  let fixture: ComponentFixture<CardfollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardfollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardfollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
