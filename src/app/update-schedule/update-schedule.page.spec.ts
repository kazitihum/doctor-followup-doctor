import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchedulePage } from './update-schedule.page';

describe('UpdateSchedulePage', () => {
  let component: UpdateSchedulePage;
  let fixture: ComponentFixture<UpdateSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
