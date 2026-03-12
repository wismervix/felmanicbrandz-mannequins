import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTabView } from './all-tab-view';

describe('AllTabView', () => {
  let component: AllTabView;
  let fixture: ComponentFixture<AllTabView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTabView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTabView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
