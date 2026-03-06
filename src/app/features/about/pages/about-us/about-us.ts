import { Component } from '@angular/core';
import { TheExperience } from '../../../../shared/components/the-experience/the-experience';
import { WhyStrip } from '../../../../shared/components/why-strip/why-strip';
import { TopNotch } from '../../../../shared/components/top-notch/top-notch';
import { TheTestimonial } from '../../../../shared/components/the-testimonial/the-testimonial';

@Component({
  selector: 'app-about-us',
  imports: [TheExperience, WhyStrip, TopNotch, TheTestimonial],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {}
