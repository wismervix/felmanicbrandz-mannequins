import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangerShopTabView } from './hanger-shop-tab-view';

describe('HangerShopTabView', () => {
  let component: HangerShopTabView;
  let fixture: ComponentFixture<HangerShopTabView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HangerShopTabView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangerShopTabView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
