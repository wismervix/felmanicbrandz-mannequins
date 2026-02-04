// ads.ts
export type BestSelling = 0 | 1;

export type Category = 'mannequins' | 'hangers';

export interface Product {
  id: number;
  price: number;
  rating: number;
  bestSelling: BestSelling;
  name: string;
  image: string;
  description: string;
}

// export type CategoryKey = keyof typeof productsData;
export type CategoryKey = Category;

const ASSETS = 'assets/images';

function randomizePrice(base: number) {
  // ±10% random
  const factor = 0.9 + Math.random() * 0.2;
  return Math.round((base * factor) / 1000) * 1000; // round to nearest 1000
}

function randomizeRating(base: number) {
  // ±0.5 random
  return Math.min(5, Math.max(1, +(base + (Math.random() - 0.5)).toFixed(1)));
}

export const productsData: Record<CategoryKey, readonly Product[]> = {
  hangers: Array.from({ length: 36 }, (_, i) => {
    const base = [
      {
        price: 35000,
        rating: 4.5,
        bestSelling: 1,
        name: 'Classic Wooden Hanger',
        image: `${ASSETS}/hanger_1.png`,
        description:
          'High-quality wooden hanger perfect for jackets, shirts, and dresses.',
      },
      {
        price: 30000,
        rating: 4.0,
        bestSelling: 0,
        name: 'Velvet Non-Slip Hanger',
        image: `${ASSETS}/hanger_2.png`,
        description:
          'Soft velvet finish prevents clothes from slipping and creasing.',
      },
      {
        price: 40000,
        rating: 5,
        bestSelling: 1,
        name: 'Premium Bamboo Hanger',
        image: `${ASSETS}/hanger_3.png`,
        description:
          'Eco-friendly bamboo hanger, sturdy and stylish for all types of clothing.',
      },
      {
        price: 36000,
        rating: 4,
        bestSelling: 1,
        name: 'Wood & Metal Hanger',
        image: `${ASSETS}/hanger_1.png`,
        description:
          'Durable combination of wood and metal for long-lasting use.',
      },
      {
        price: 38000,
        rating: 4.2,
        bestSelling: 1,
        name: 'Luxury Coat Hanger',
        image: `${ASSETS}/hanger_2.png`,
        description:
          'Designed to hold heavy coats and jackets without bending or warping.',
      },
      {
        price: 32000,
        rating: 3.8,
        bestSelling: 0,
        name: 'Basic Plastic Hanger',
        image: `${ASSETS}/hanger_3.png`,
        description:
          'Affordable and practical hanger for everyday clothing storage.',
      },
    ];
    const item = base[i % base.length];
    return {
      ...item,
      id: i + 1,
      name: `${item.name} #${i + 1}`,
      price: randomizePrice(item.price),
      rating: randomizeRating(item.rating),
      bestSelling: item.bestSelling as BestSelling,
    };
  }),

  mannequins: Array.from({ length: 36 }, (_, i) => {
    const base = [
      {
        price: 45000,
        rating: 5,
        bestSelling: 1,
        name: 'Full Body Mannequin',
        image: `${ASSETS}/mannequin_1.png`,
        description: 'Durable full-body mannequin ideal for showroom displays.',
      },
      {
        price: 30000,
        rating: 3.5,
        bestSelling: 0,
        name: 'Torso Mannequin',
        image: `${ASSETS}/mannequin_2.png`,
        description: 'Lightweight torso mannequin for tops and accessories.',
      },
      {
        price: 55000,
        rating: 4.8,
        bestSelling: 1,
        name: 'Adjustable Mannequin',
        image: `${ASSETS}/mannequin_3.jpg`,
        description: 'Height-adjustable mannequin for flexible store layouts.',
      },
      {
        price: 60000,
        rating: 4.7,
        bestSelling: 1,
        name: 'Female Display Mannequin',
        image: `${ASSETS}/mannequin_4.jpg`,
        description: 'Elegant female mannequin designed for fashion retail.',
      },
      {
        price: 35000,
        rating: 4,
        bestSelling: 0,
        name: 'Head Mannequin',
        image: `${ASSETS}/mannequin_5.jpg`,
        description: 'Display head for wigs, hats, and accessories.',
      },
      {
        price: 32000,
        rating: 3.9,
        bestSelling: 0,
        name: 'Kids Mannequin',
        image: `${ASSETS}/experience_bg.jpg`,
        description: 'Child-size mannequin suitable for kids clothing.',
      },
    ];
    const item = base[i % base.length];
    return {
      ...item,
      id: i + 1,
      name: `${item.name} #${i + 1}`,
      price: randomizePrice(item.price),
      rating: randomizeRating(item.rating),
      bestSelling: item.bestSelling as BestSelling,
    };
  }),
} as const;

// Type guard to check if a string is a valid Category
export function isValidCategory(category: string): category is CategoryKey {
  return category in productsData;
}

// Helper function to get courses by category
export function getCoursesByCategory(category: CategoryKey): Product[] {
  return [...productsData[category]];
}

// Helper to get all best selling courses
export function getBestSellingCourses(): Product[] {
  return Object.values(productsData)
    .flat()
    .filter((course) => course.bestSelling === 1);
}

// Additional useful helpers
export function getCourseById(id: number): Product | undefined {
  return Object.values(productsData)
    .flat()
    .find((course) => course.id === id);
}

// Get platform from course
export function getCategoryFromCourse(
  courseId: number,
): CategoryKey | undefined {
  for (const [category, courses] of Object.entries(productsData)) {
    if (courses.some((course) => course.id === courseId)) {
      return category as CategoryKey;
    }
  }
  return undefined;
}

export default productsData;
