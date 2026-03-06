import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangerTabView } from './hanger-tab-view';

describe('HangerTabView', () => {
  let component: HangerTabView;
  let fixture: ComponentFixture<HangerTabView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HangerTabView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangerTabView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
