import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroclientesComponent } from './filtroclientes.component';

describe('FiltroclientesComponent', () => {
  let component: FiltroclientesComponent;
  let fixture: ComponentFixture<FiltroclientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroclientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
