import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSlider } from './base-carousel';

describe('AdSlider', () => {
  let component: AdSlider;
  let fixture: ComponentFixture<AdSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(AdSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
