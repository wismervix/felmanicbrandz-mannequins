import { Component, OnInit } from '@angular/core';
import { SearchFilter } from '../../../../shared/components/search-filter/search-filter';

@Component({
  selector: 'app-the-hero',
  imports: [SearchFilter],
  templateUrl: './the-hero.html',
  styleUrl: './the-hero.scss',
})
export class TheHero implements OnInit {
  slides = [
    'assets/images/hero_bg.jpg',
    'assets/images/mannequin_10.jpeg',
    'assets/images/mannequin_11.jpeg',
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
