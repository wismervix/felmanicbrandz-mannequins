// faqs.ts
export interface Faq {
  id: number;
  title: string;
  description: string;
}

export const faqData: readonly Faq[] = [
  {
    id: 1,
    title: 'Do you manufacture your own mannequins and hangers?',
    description:
      'Yes, we manufacture a wide range of mannequins, hangers, and retail display products in our own factory using premium materials and strict quality standards.',
  },
  {
    id: 2,
    title: 'Do you also import display products?',
    description:
      'Yes, in addition to our in-house manufacturing, we import carefully selected mannequins, hangers, and other retail display solutions to offer a broader variety of styles and designs.',
  },
  {
    id: 3,
    title: 'What types of businesses do you supply?',
    description:
      'We supply boutiques, fashion stores, supermarkets, showrooms, and large retail outlets, providing display solutions suitable for businesses of all sizes.',
  },
  {
    id: 4,
    title: 'Can I place bulk or wholesale orders?',
    description:
      'Absolutely. We accommodate bulk and wholesale orders with competitive pricing and reliable fulfillment.',
  },
  {
    id: 5,
    title: 'How do you ensure product quality?',
    description:
      'All our products—whether manufactured or imported—undergo strict quality checks to ensure durability, modern design, and a professional finish.',
  },
] as const;

export default faqData;
