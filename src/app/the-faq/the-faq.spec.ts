import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheFaq } from './the-faq';

describe('TheFaq', () => {
  let component: TheFaq;
  let fixture: ComponentFixture<TheFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheFaq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheFaq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
