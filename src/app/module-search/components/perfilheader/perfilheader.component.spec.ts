import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilheaderComponent } from './perfilheader.component';

describe('PerfilheaderComponent', () => {
  let component: PerfilheaderComponent;
  let fixture: ComponentFixture<PerfilheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
