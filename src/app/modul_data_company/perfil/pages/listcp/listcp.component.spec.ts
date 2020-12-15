import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcpComponent } from './listcp.component';

describe('ListcpComponent', () => {
  let component: ListcpComponent;
  let fixture: ComponentFixture<ListcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
