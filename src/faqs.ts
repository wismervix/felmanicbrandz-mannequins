// faqs.ts
export interface Faq {
  id: number;
  title: string;
  description: string;
}

export const faqData: readonly Faq[] = [
  {
    id: 1,
    title: 'What is your return policy?',
    description: 'We accept returns within 7 days of purchase.',
  },
  {
    id: 2,
    title: 'What is your return policy?',
    description: 'We accept returns within 7 days of purchase.',
  },
] as const;

export default faqData;
