import { ImageProps } from 'react-native';

export const BACKGROUND_COLOR = '#F1F1F1';

export interface PageInterface extends Pick<ImageProps, 'source'> {
  title: string;
  description: string;
}

export const PAGES: PageInterface[] = [
  {
    title: 'Samurai',
    description:
      'A durable deck featured with a menacing face of a samurai at the center of the underside accompanied with a large red sun motif.',
    source: require('../assets/images/nft01.png'),
  },
  {
    title: 'Reject',
    description:
      "You don't have time to consider wheter the graphic on your CSS board would be considered modernist.",
      source: require('../assets/images/nft02.jpeg'),
    },
];

export const PAGESLYFSEC: PageInterface[] = [
  {
    title: 'Samurai',
    description:
      'A durable deck featured with a menacing face of a samurai at the center of the underside accompanied with a large red sun motif.',
    source: require('../assets/images/nft01.png'),
  },
  
];