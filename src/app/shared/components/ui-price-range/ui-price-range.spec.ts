import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPriceRange } from './ui-price-range';

describe('UiPriceRange', () => {
  let component: UiPriceRange;
  let fixture: ComponentFixture<UiPriceRange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPriceRange]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiPriceRange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
