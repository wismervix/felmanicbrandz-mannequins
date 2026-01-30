import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { TitleCasePipe } from '@angular/common';

import { SvgIcon } from '../svg-icon/svg-icon';
import { BaseCarousel } from '../base-carousel/base-carousel';

import { CategoryKey, getCoursesByCategory } from '../../products';

@Component({
  selector: 'app-hanger-tab-view',
  standalone: true,
  imports: [RouterModule, BaseCarousel, SvgIcon],
  // imports: [RouterModule, AdSlider, SvgIcon, TitleCasePipe],
  templateUrl: './hanger-tab-view.html',
  styleUrl: './hanger-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangerTabView {
  getCoursesByCategory(category: CategoryKey) {
    return getCoursesByCategory(category);
  }

  getCategoryDisplayName(category: CategoryKey): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
