// testimonies.ts
export interface Testimony {
  id: number;
  name: string;
  testimony: string;
  rating: number;
  photo: string;
}

const ASSETS = 'assets/images';

export const testimonialData: readonly Testimony[] = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    testimony: 'This is an amazing service. Highly recommended!',
    photo: `${ASSETS}/testimonial_1.png`,
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 5,
    testimony: 'Fantastic experience working with this team.',
    photo: `${ASSETS}/testimonial_2.jpg`,
  },
  {
    id: 3,
    name: 'Michael Brown',
    rating: 4.3,
    testimony:
      'The level of professionalism and attention to detail exceeded our expectations.',
    photo: `${ASSETS}/testimonial_2.jpg`,
  },
  {
    id: 4,
    name: 'Emily Johnson',
    rating: 5,
    testimony:
      'Working with them was seamless. Communication was clear and the results were excellent.',
    photo: `${ASSETS}/testimonial_2.jpg`,
  },
  {
    id: 5,
    name: 'David Wilson',
    rating: 4.7,
    testimony:
      'They delivered exactly what we needed, on time and with great technical expertise.',
    photo: `${ASSETS}/testimonial_2.jpg`,
  },
  {
    id: 6,
    name: 'Sophia Martinez',
    rating: 5,
    testimony:
      'Reliable, efficient, and easy to work with. I would gladly collaborate again.',
    photo: `${ASSETS}/testimonial_2.jpg`,
  },
  {
    id: 7,
    name: 'Chris Anderson',
    rating: 5,
    testimony:
      'Their support and guidance made a huge difference in our project’s success.',
    photo: `${ASSETS}/testimonial_2.jpg`,
  },
  {
    id: 8,
    name: 'Olivia Taylor',
    rating: 4.6,
    testimony:
      'A very smooth process from start to finish. The team truly understands client needs.',
    photo: `${ASSETS}/testimonial_2.jpg`,
  },
  {
    id: 9,
    name: 'Daniel Lee',
    rating: 5,
    testimony:
      'High-quality work, great collaboration, and strong problem-solving skills.',
    photo: `${ASSETS}/testimonial_2.jpg`,
  },
] as const;

export default testimonialData;
