import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { SvgIcon } from './svg-icon/svg-icon';
import { TheNavbar } from './the-navbar/the-navbar';
import { TheHero } from "./the-hero/the-hero";
import { WhyStrip } from "./why-strip/why-strip";
import { TheTab } from "./the-tab/the-tab";

@Component({
  selector: 'app-root',
  imports: [TheNavbar, TheHero, WhyStrip, RouterOutlet],
  // imports: [TheNavbar, TheHero, WhyStrip, TheTab],
  // imports: [TheNavbar, TheHero, WhyStrip, RouterOutlet, TheTab],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'felmanicbrandz-mannequins';
}
