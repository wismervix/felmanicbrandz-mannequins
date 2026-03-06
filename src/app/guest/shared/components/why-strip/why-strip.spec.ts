import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyStrip } from './why-strip';

describe('WhyStrip', () => {
  let component: WhyStrip;
  let fixture: ComponentFixture<WhyStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyStrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyStrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
