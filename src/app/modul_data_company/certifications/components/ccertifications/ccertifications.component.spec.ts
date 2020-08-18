import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcertificationsComponent } from './ccertifications.component';

describe('CcertificationsComponent', () => {
  let component: CcertificationsComponent;
  let fixture: ComponentFixture<CcertificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcertificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
