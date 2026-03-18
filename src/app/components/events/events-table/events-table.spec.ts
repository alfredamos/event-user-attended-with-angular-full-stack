import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTable } from './events-table';

describe('EventsTable', () => {
  let component: EventsTable;
  let fixture: ComponentFixture<EventsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
