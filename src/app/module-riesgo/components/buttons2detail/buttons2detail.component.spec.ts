import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Buttons2detailComponent } from './buttons2detail.component';

describe('Buttons2detailComponent', () => {
  let component: Buttons2detailComponent;
  let fixture: ComponentFixture<Buttons2detailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Buttons2detailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Buttons2detailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
