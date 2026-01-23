import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheTab } from './the-tab';

describe('TheTab', () => {
  let component: TheTab;
  let fixture: ComponentFixture<TheTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
