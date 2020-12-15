import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilmenuComponent } from './perfilmenu.component';

describe('PerfilmenuComponent', () => {
  let component: PerfilmenuComponent;
  let fixture: ComponentFixture<PerfilmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
