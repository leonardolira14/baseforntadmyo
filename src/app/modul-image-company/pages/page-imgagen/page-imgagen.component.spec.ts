import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageImgagenComponent } from './page-imgagen.component';

describe('PageImgagenComponent', () => {
  let component: PageImgagenComponent;
  let fixture: ComponentFixture<PageImgagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageImgagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageImgagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
