import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTab } from './shop-tab';

describe('ShopTab', () => {
  let component: ShopTab;
  let fixture: ComponentFixture<ShopTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
