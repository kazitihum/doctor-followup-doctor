import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReplayPage } from './doctor-replay.page';

describe('DoctorReplayPage', () => {
  let component: DoctorReplayPage;
  let fixture: ComponentFixture<DoctorReplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorReplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
