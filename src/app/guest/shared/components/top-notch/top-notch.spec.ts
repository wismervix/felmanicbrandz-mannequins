import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNotch } from './top-notch';

describe('TopNotch', () => {
  let component: TopNotch;
  let fixture: ComponentFixture<TopNotch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNotch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNotch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
