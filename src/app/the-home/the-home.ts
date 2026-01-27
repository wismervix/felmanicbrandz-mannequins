import { Component } from '@angular/core';
import { TheHero } from "../the-hero/the-hero";
import { WhyStrip } from "../why-strip/why-strip";
import { TheExperience } from "../the-experience/the-experience";
import { TheFaq } from "../the-faq/the-faq";
import { RouterModule } from "@angular/router";
import { TopNotch } from "../top-notch/top-notch";
import { TheTestimonial } from "../the-testimonial/the-testimonial";

@Component({
  selector: 'app-the-home',
  imports: [TheHero, WhyStrip, TheExperience, TheFaq, RouterModule, TopNotch, TheTestimonial],
  templateUrl: './the-home.html',
  styleUrl: './the-home.scss',
})
export class TheHome {

}
