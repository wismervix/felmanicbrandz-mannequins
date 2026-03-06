import { Component } from '@angular/core';
import { TheHero } from '../../components/the-hero/the-hero';
import { WhyStrip } from '../../../../shared/components/why-strip/why-strip';
import { TheExperience } from '../../../../shared/components/the-experience/the-experience';
import { TheFaq } from '../../../../shared/components/the-faq/the-faq';
import { RouterModule } from '@angular/router';
import { TopNotch } from '../../../../shared/components/top-notch/top-notch';
import { TheTestimonial } from '../../../../shared/components/the-testimonial/the-testimonial';

@Component({
  selector: 'app-the-home',
  imports: [
    TheHero,
    WhyStrip,
    TheExperience,
    TheFaq,
    RouterModule,
    TopNotch,
    TheTestimonial,
  ],
  templateUrl: './the-home.html',
  styleUrl: './the-home.scss',
})
export class TheHome {}
