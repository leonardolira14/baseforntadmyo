import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CassociationsComponent } from './cassociations.component';

describe('CassociationsComponent', () => {
  let component: CassociationsComponent;
  let fixture: ComponentFixture<CassociationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CassociationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CassociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
