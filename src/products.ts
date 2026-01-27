// ads.ts
export type BestSelling = 0 | 1;

export type Category = 'mannequins' | 'hangers' | 'linkedIn' | 'facebook';

export interface AdCourse {
  id: number;
  price: number;
  rating: number;
  bestSelling: BestSelling;
  name: string;
  image: string;
  description: string;
}

// export type CategoryKey = keyof typeof adsData;
export type CategoryKey = Category;

const ASSETS = 'assets/images';

export const adsData: Record<CategoryKey, readonly AdCourse[]> = {
  hangers: [
    {
      id: 1,
      price: 35000,
      rating: 4.5,
      bestSelling: 1,
      name: 'Classic Wooden Hanger',
      image: `${ASSETS}/hanger_1.png`,
      description:
        'High-quality wooden hanger perfect for jackets, shirts, and dresses.',
    },
    {
      id: 2,
      price: 30000,
      rating: 4.0,
      bestSelling: 0,
      name: 'Velvet Non-Slip Hanger',
      image: `${ASSETS}/hanger_2.png`,
      description:
        'Soft velvet finish prevents clothes from slipping and creasing.',
    },
    {
      id: 3,
      price: 40000,
      rating: 5,
      bestSelling: 1,
      name: 'Premium Bamboo Hanger',
      image: `${ASSETS}/hanger_3.png`,
      description:
        'Eco-friendly bamboo hanger, sturdy and stylish for all types of clothing.',
    },
    {
      id: 4,
      price: 36000,
      rating: 4,
      bestSelling: 1,
      name: 'Wood & Metal Hanger',
      image: `${ASSETS}/hanger_1.png`,
      description:
        'Durable combination of wood and metal for long-lasting use.',
    },
    {
      id: 5,
      price: 38000,
      rating: 4.2,
      bestSelling: 1,
      name: 'Luxury Coat Hanger',
      image: `${ASSETS}/hanger_2.png`,
      description:
        'Designed to hold heavy coats and jackets without bending or warping.',
    },
    {
      id: 6,
      price: 32000,
      rating: 3.8,
      bestSelling: 0,
      name: 'Basic Plastic Hanger',
      image: `${ASSETS}/hanger_3.png`,
      description:
        'Affordable and practical hanger for everyday clothing storage.',
    },
  ],
  mannequins: [
    {
      id: 1,
      price: 45000,
      rating: 5,
      bestSelling: 1,
      name: 'Full Body Mannequin',
      image: `${ASSETS}/mannequin_1.png`,
      description: 'Durable full-body mannequin ideal for showroom displays.',
    },
    {
      id: 2,
      price: 30000,
      rating: 3.5,
      bestSelling: 0,
      name: 'Torso Mannequin',
      image: `${ASSETS}/mannequin_2.png`,
      description: 'Lightweight torso mannequin for tops and accessories.',
    },
    {
      id: 3,
      price: 55000,
      rating: 4.8,
      bestSelling: 1,
      name: 'Adjustable Mannequin',
      image: `${ASSETS}/experience_bg.jpg`,
      description: 'Height-adjustable mannequin for flexible store layouts.',
    },
    {
      id: 4,
      price: 60000,
      rating: 4.7,
      bestSelling: 1,
      name: 'Female Display Mannequin',
      image: `${ASSETS}/hero_bg.jpg`,
      description: 'Elegant female mannequin designed for fashion retail.',
    },
    {
      id: 5,
      price: 35000,
      rating: 4,
      bestSelling: 0,
      name: 'Head Mannequin',
      image: `${ASSETS}/mannequin_1.png`,
      description: 'Display head for wigs, hats, and accessories.',
    },
    {
      id: 6,
      price: 32000,
      rating: 3.9,
      bestSelling: 0,
      name: 'Kids Mannequin',
      image: `${ASSETS}/mannequin_2.png`,
      description: 'Child-size mannequin suitable for kids clothing.',
    },
  ],

  linkedIn: [
    {
      id: 1,
      price: 70000,
      rating: 4.9,
      bestSelling: 1,
      name: 'Leather Handbag',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Premium leather handbag, perfect for work and casual use.',
    },
    {
      id: 2,
      price: 30000,
      rating: 3.5,
      bestSelling: 0,
      name: 'Fabric Tote Bag',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Eco-friendly tote bag for everyday shopping and errands.',
    },
    {
      id: 3,
      price: 55000,
      rating: 4.6,
      bestSelling: 1,
      name: 'Designer Wallet',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Compact wallet crafted from quality materials.',
    },
    {
      id: 4,
      price: 40000,
      rating: 4.2,
      bestSelling: 1,
      name: 'Silk Neck Tie',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Elegant silk neck tie for formal occasions.',
    },
    {
      id: 5,
      price: 60000,
      rating: 4.7,
      bestSelling: 1,
      name: 'Statement Necklace',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Bold fashion necklace that elevates any outfit.',
    },
    {
      id: 6,
      price: 32000,
      rating: 3.8,
      bestSelling: 0,
      name: 'Leather Keychain',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Durable and stylish keychain for everyday use.',
    },
  ],
  facebook: [
    {
      id: 1,
      price: 45000,
      rating: 4.8,
      bestSelling: 1,
      name: 'Wide Brim Hat',
      image: `${ASSETS}/course-1.jpg`,
      description:
        'Stylish wide-brim hat to protect from sun while looking chic.',
    },
    {
      id: 2,
      price: 32000,
      rating: 3.7,
      bestSelling: 0,
      name: 'Canvas Sneakers',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Comfortable casual sneakers perfect for daily wear.',
    },
    {
      id: 3,
      price: 50000,
      rating: 4.5,
      bestSelling: 1,
      name: 'Leather Sandals',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Premium sandals crafted for comfort and style.',
    },
    {
      id: 4,
      price: 65000,
      rating: 4.9,
      bestSelling: 1,
      name: 'Wool Scarf',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Cozy wool scarf to keep warm during winter.',
    },
    {
      id: 5,
      price: 38000,
      rating: 4.0,
      bestSelling: 0,
      name: 'Statement Earrings',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Elegant earrings that add a touch of glamour.',
    },
    {
      id: 6,
      price: 34000,
      rating: 3.9,
      bestSelling: 0,
      name: 'Leather Bracelet',
      image: `${ASSETS}/course-1.jpg`,
      description: 'Stylish bracelet for everyday fashion accessory.',
    },
  ],
} as const;

// Type guard to check if a string is a valid Category
export function isValidCategory(category: string): category is CategoryKey {
  return category in adsData;
}

// Helper function to get courses by category
export function getCoursesByCategory(category: CategoryKey): AdCourse[] {
  return [...adsData[category]];
}

// Helper to get all best selling courses
export function getBestSellingCourses(): AdCourse[] {
  return Object.values(adsData)
    .flat()
    .filter((course) => course.bestSelling === 1);
}

// Additional useful helpers
export function getCourseById(id: number): AdCourse | undefined {
  return Object.values(adsData)
    .flat()
    .find((course) => course.id === id);
}

// Get platform from course
export function getCategoryFromCourse(
  courseId: number,
): CategoryKey | undefined {
  for (const [category, courses] of Object.entries(adsData)) {
    if (courses.some((course) => course.id === courseId)) {
      return category as CategoryKey;
    }
  }
  return undefined;
}

export default adsData;
