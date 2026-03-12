import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShopTabView } from './all-shop-tab-view';

describe('AllShopTabView', () => {
  let component: AllShopTabView;
  let fixture: ComponentFixture<AllShopTabView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllShopTabView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllShopTabView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
