import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cbuttons2detailsComponent } from './cbuttons2details.component';

describe('Cbuttons2detailsComponent', () => {
  let component: Cbuttons2detailsComponent;
  let fixture: ComponentFixture<Cbuttons2detailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cbuttons2detailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cbuttons2detailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
