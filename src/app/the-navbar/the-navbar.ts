import { Component, OnInit, OnDestroy } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';

@Component({
  selector: 'app-the-navbar',
  imports: [SvgIcon],
  templateUrl: './the-navbar.html',
  styleUrl: './the-navbar.scss',
})
export class TheNavbar implements OnInit, OnDestroy {
  currentTime = '';
  private timeInterval: any;

  ngOnInit() {
    this.updateTime();
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateTime() {
    const now = new Date();
    // Format like "9:41" (Apple style)
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;

    // Optional: Add AM/PM for 12-hour format
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    // const displayHours = hours % 12 || 12;
    // this.currentTime = `${displayHours}:${minutes} ${ampm}`;
  }
}
