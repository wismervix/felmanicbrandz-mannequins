import { Component } from '@angular/core';
import { SvgIcon } from "../svg-icon/svg-icon";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-notch',
  imports: [SvgIcon, RouterModule],
  templateUrl: './top-notch.html',
  styleUrl: './top-notch.scss',
})
export class TopNotch {}
