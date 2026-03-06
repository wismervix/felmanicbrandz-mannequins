import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MannequinShopTabView } from './mannequin-shop-tab-view';

describe('MannequinShopTabView', () => {
  let component: MannequinShopTabView;
  let fixture: ComponentFixture<MannequinShopTabView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MannequinShopTabView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MannequinShopTabView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
