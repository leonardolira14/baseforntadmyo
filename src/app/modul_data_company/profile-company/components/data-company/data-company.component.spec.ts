import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCompanyComponent } from './data-company.component';

describe('DataCompanyComponent', () => {
  let component: DataCompanyComponent;
  let fixture: ComponentFixture<DataCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
