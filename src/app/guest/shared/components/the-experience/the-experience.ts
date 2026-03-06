import { Component } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-the-experience',
  imports: [SvgIcon, RouterModule],
  templateUrl: './the-experience.html',
  styleUrl: './the-experience.scss',
})
export class TheExperience {}
