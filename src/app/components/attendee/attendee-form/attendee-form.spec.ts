import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeForm } from './attendee-form';

describe('AttendeeForm', () => {
  let component: AttendeeForm;
  let fixture: ComponentFixture<AttendeeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
