import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosqComponent } from './filtrosq.component';

describe('FiltrosqComponent', () => {
  let component: FiltrosqComponent;
  let fixture: ComponentFixture<FiltrosqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
