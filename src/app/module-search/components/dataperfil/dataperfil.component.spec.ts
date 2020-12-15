import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataperfilComponent } from './dataperfil.component';

describe('DataperfilComponent', () => {
  let component: DataperfilComponent;
  let fixture: ComponentFixture<DataperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
