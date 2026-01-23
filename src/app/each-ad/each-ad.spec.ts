import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachAd } from './each-ad';

describe('EachAd', () => {
  let component: EachAd;
  let fixture: ComponentFixture<EachAd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EachAd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachAd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
