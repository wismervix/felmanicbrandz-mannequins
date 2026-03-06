import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheShop } from './the-shop';

describe('TheShop', () => {
  let component: TheShop;
  let fixture: ComponentFixture<TheShop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheShop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheShop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
