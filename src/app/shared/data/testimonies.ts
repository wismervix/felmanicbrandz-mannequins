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
    name: 'Nancy Aigbokhan',
    rating: 5,
    testimony:
      "My Go-to everytime for durable and affordable mannequins and hangers. They don't disappoint, you get your goods delivered to you wherever you are on the agreed date. I like the good customer service relationship too. I highly recommend💯",
    photo: `${ASSETS}/testimony_nancy.jpeg`,
  },
  {
    id: 2,
    name: 'Henry Autoz.E',
    rating: 5,
    testimony:
      'I recently bought a Mannequin at [FelManicBrandz] and was thoroughly impressed by what I got and the impeccable service. I truly say this Brand is the best I’ve ever gotten a Mannequin. I can’t recommend [FelManicBrandz] enough for where you can get a unique Mannequin.',
    photo: `${ASSETS}/testimony_henry.png`,
  },
  {
    id: 3,
    name: 'Rasmus Elm',
    rating: 4.3,
    testimony:
      "I must commend the transparency in dealings with buyers, customers and affiliates. There's no questioning their transparency, that's for sure. 💯. Moreso, they're always available and within reach, borderline dedication no doubt - reliable. Then, the quality goods comin' at so very affordable prices in comparison with the business's contemporaries, that's definitely getting a thumbs up from me👍🏽",
    photo: `${ASSETS}/testimony_rasmus.png`,
  },
  {
    id: 4,
    name: 'aniekan boluwatife',
    rating: 5,
    testimony:
      "The services here is top-notch, good customer relationship. He really is the best at what he does, he sells quality goods and also very affordable. I give him a 5 star rating because he'll give you the best for your money",
    photo: `${ASSETS}/testimony_aniekan.png`,
  },
  {
    id: 5,
    name: 'Ehiabhi Mary',
    rating: 4.7,
    testimony:
      "Their service is one of its kind, trustworthy, reliable and transparent. delivery is nation wide💯.....I must say they are good at what they do...... Got some mannequins from them and haven't regretted it, you won't either✌️💯",
    photo: `${ASSETS}/testimony_ehiabhi.png`,
  },
  {
    id: 6,
    name: 'Lucy Isaac',
    rating: 5,
    testimony:
      'Please patronize him he sells qualities I have bought from him and no complain.',
    photo: `${ASSETS}/testimony_lucy.jpeg`,
  },
] as const;

export default testimonialData;
