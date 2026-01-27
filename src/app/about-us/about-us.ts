import { Component } from '@angular/core';
import { TheExperience } from "../the-experience/the-experience";
import { WhyStrip } from "../why-strip/why-strip";
import { TopNotch } from "../top-notch/top-notch";
import { TheTestimonial } from "../the-testimonial/the-testimonial";

@Component({
  selector: 'app-about-us',
  imports: [TheExperience, WhyStrip, TopNotch, TheTestimonial],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {

}
