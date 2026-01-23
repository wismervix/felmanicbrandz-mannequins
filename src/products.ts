// ads.ts
export type Availability = 0 | 1;

export type Platform = 'google' | 'instagram' | 'linkedIn' | 'facebook';

export interface AdCourse {
  id: number;
  progress: number;
  available: Availability;
  name: string;
  image: string;
  description: string;
}

// export type PlatformKey = keyof typeof adsData;
export type PlatformKey = Platform;

export const adsData: Record<PlatformKey, readonly AdCourse[]> = {
  google: [
    {
      id: 1,
      progress: 30,
      available: 1,
      name: 'Google Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 2,
      progress: 0,
      available: 0,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 3,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 4,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 5,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 6,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
  ],
  instagram: [
    {
      id: 1,
      progress: 30,
      available: 1,
      name: 'Instagram Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 2,
      progress: 0,
      available: 0,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 3,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 4,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 5,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 6,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
  ],
  linkedIn: [
    {
      id: 1,
      progress: 30,
      available: 1,
      name: 'LinkedIn Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 2,
      progress: 0,
      available: 0,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 3,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 4,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 5,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 6,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
  ],
  facebook: [
    {
      id: 1,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 2,
      progress: 0,
      available: 0,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 3,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 4,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 5,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
    {
      id: 6,
      progress: 30,
      available: 1,
      name: 'Facebook Ads master class',
      image: '/assets/images/course-1.jpg',
      description:
        'Learn our to run ads on social media and make most of its capability to help you with ..',
    },
  ],
} as const;

// Type guard to check if a string is a valid platform
export function isValidPlatform(platform: string): platform is PlatformKey {
  return platform in adsData;
}

// Helper function to get courses by platform
export function getCoursesByPlatform(platform: PlatformKey): AdCourse[] {
  return [...adsData[platform]];
}

// Helper to get all available courses
export function getAvailableCourses(): AdCourse[] {
  return Object.values(adsData)
    .flat()
    .filter((course) => course.available === 1);
}

// Additional useful helpers
export function getCourseById(id: number): AdCourse | undefined {
  return Object.values(adsData)
    .flat()
    .find(course => course.id === id);
}

export function getCoursesInProgress(): AdCourse[] {
  return Object.values(adsData)
    .flat()
    .filter(course => course.progress > 0 && course.progress < 100);
}

// Get platform from course
export function getPlatformFromCourse(courseId: number): PlatformKey | undefined {
  for (const [platform, courses] of Object.entries(adsData)) {
    if (courses.some(course => course.id === courseId)) {
      return platform as PlatformKey;
    }
  }
  return undefined;
}


export default adsData;
