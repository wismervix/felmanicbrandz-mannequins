import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
// import { SvgIcon } from './svg-icon/svg-icon';
import { TheNavbar } from './the-navbar/the-navbar';
import { TheHome } from "./the-home/the-home";

@Component({
  selector: 'app-root',
  imports: [TheNavbar, RouterOutlet],
  // imports: [TheNavbar, TheHome, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private titleService = inject(Title);
  protected title = 'felmanicbrandz-mannequins';

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
