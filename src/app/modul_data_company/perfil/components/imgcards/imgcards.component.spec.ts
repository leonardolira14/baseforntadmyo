import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcardsComponent } from './imgcards.component';

describe('ImgcardsComponent', () => {
  let component: ImgcardsComponent;
  let fixture: ComponentFixture<ImgcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
