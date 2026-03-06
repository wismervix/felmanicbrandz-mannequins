import { Component } from '@angular/core';
import { Faq, faqData } from '../../../../faqs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-the-faq',
  imports: [RouterModule],
  templateUrl: './the-faq.html',
  styleUrl: './the-faq.scss',
})
export class TheFaq {
  faqs: readonly Faq[] = faqData;
}
