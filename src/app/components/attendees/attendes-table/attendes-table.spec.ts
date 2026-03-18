import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendesTable } from './attendes-table';

describe('AttendesTable', () => {
  let component: AttendesTable;
  let fixture: ComponentFixture<AttendesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendesTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
