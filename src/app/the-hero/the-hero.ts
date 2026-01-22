import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-the-hero',
  imports: [],
  templateUrl: './the-hero.html',
  styleUrl: './the-hero.scss',
})
export class TheHero implements OnInit {
  slides = [
    'assets/images/hero_bg.jpg',
    'assets/images/experience_bg.jpg',
    'assets/images/cart_1.png',
  ];

  current = 0;
  private intervalId?: number;

  ngOnInit() {
    this.intervalId = window.setInterval(() => {
      this.current = (this.current + 1) % this.slides.length;
    }, 5000);
  }

  showSlide(index: number) {
    this.current = index;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
