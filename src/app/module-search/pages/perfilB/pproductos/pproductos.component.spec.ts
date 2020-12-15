import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PproductosComponent } from './pproductos.component';

describe('PproductosComponent', () => {
  let component: PproductosComponent;
  let fixture: ComponentFixture<PproductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PproductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
