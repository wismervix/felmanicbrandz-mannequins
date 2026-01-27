import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheTestimonial } from './the-testimonial';

describe('TheTestimonial', () => {
  let component: TheTestimonial;
  let fixture: ComponentFixture<TheTestimonial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheTestimonial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheTestimonial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
