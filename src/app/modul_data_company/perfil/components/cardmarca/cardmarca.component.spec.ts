import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardmarcaComponent } from './cardmarca.component';

describe('CardmarcaComponent', () => {
  let component: CardmarcaComponent;
  let fixture: ComponentFixture<CardmarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardmarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardmarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
