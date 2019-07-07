import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHisPage } from './payment-his.page';

describe('PaymentHisPage', () => {
  let component: PaymentHisPage;
  let fixture: ComponentFixture<PaymentHisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
