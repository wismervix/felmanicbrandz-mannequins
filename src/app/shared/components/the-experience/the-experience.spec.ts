import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheExperience } from './the-experience';

describe('TheExperience', () => {
  let component: TheExperience;
  let fixture: ComponentFixture<TheExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheExperience]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheExperience);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
