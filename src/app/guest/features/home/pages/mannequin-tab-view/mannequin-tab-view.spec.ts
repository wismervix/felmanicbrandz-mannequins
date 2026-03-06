import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MannequinTabView } from './mannequin-tab-view';

describe('MannequinTabView', () => {
  let component: MannequinTabView;
  let fixture: ComponentFixture<MannequinTabView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MannequinTabView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MannequinTabView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
