import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSpaceComponent } from './main-space.component';

describe('MainSpaceComponent', () => {
  let component: MainSpaceComponent;
  let fixture: ComponentFixture<MainSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
