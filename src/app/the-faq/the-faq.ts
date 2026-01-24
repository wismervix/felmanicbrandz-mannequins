import { Component } from '@angular/core';
import { Faq, faqData } from '../../faqs';

@Component({
  selector: 'app-the-faq',
  imports: [],
  templateUrl: './the-faq.html',
  styleUrl: './the-faq.scss',
})
export class TheFaq {
  faqs: readonly Faq[] = faqData;
}
