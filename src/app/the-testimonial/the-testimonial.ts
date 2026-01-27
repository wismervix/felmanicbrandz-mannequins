import { Component, ElementRef, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { Testimony, testimonialData } from '../../testimonies';
import { SvgIcon } from "../svg-icon/svg-icon";

@Component({
  selector: 'app-the-testimonial',
  imports: [SlicePipe, SvgIcon],
  templateUrl: './the-testimonial.html',
  styleUrl: './the-testimonial.scss',
})
export class TheTestimonial {
  @ViewChild('slider', { static: true })
  slider!: ElementRef<HTMLDivElement>;

  scrollAmount = 620;

  isDown = false;
  startX = 0;
  scrollLeftPos = 0;
  
  testimonials: readonly Testimony[] = testimonialData;

  scrollRight() {
    this.slider.nativeElement.scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth',
    });
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({
      left: -this.scrollAmount,
      behavior: 'smooth',
    });
  }

  onMouseDown(event: MouseEvent) {
    this.isDown = true;
    this.startX = event.pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeftPos = this.slider.nativeElement.scrollLeft;
  }

  onMouseUp() {
    this.isDown = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();

    const x = event.pageX - this.slider.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.slider.nativeElement.scrollLeft = this.scrollLeftPos - walk;
  }
}
