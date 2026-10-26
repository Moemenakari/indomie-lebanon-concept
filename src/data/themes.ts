export type ThemeId = 'hot' | 'chicken' | 'veg' | 'curry' | 'fried' | 'kfiery' | 'kmush';

export type ParticleKind =
  | 'chilli' | 'flame' | 'ember' | 'drumstick' | 'herb' | 'noodle' | 'pea' | 'carrot'
  | 'broccoli' | 'curryleaf' | 'dust' | 'shallot' | 'sesame' | 'mushroom';

export type Place = 'Tripoli' | 'Batroun' | 'Beirut' | 'Saida' | 'Tyre' | 'Bekaa' | 'Zahle';

export interface Theme {
  id: ThemeId;
  /** light → mid → deep. Never one flat colour. */
  tones: [string, string, string];
  accent: string;
  ink: string;
  sea: string;
  place: Place;
  spot: string;
  particles: ParticleKind[];
}

export const THEMES: Record<ThemeId, Theme> = {
  hot: {
    id: 'hot', tones: ['#FFD6E4', '#FF8FB8', '#E8336F'], accent: '#D7192D', ink: '#5A0B24', sea: '#F46A9B',
    place: 'Beirut', spot: 'Raouche, Beirut', particles: ['chilli', 'flame', 'ember'],
  },
  chicken: {
    id: 'chicken', tones: ['#FFF5C9', '#FFD54A', '#F5A623'], accent: '#E8590C', ink: '#5C3B00', sea: '#3FA9D9',
    place: 'Batroun', spot: 'Phoenician wall, Batroun', particles: ['drumstick', 'herb', 'noodle'],
  },
  veg: {
    id: 'veg', tones: ['#E6F6E2', '#A9D8A0', '#6E9C4F'], accent: '#3E7B27', ink: '#1F3D14', sea: '#7CC3C9',
    place: 'Tyre', spot: 'A village in South Lebanon', particles: ['pea', 'carrot', 'broccoli'],
  },
  curry: {
    id: 'curry', tones: ['#FFE6C9', '#FFB25B', '#F07C1F'], accent: '#D9452B', ink: '#5A2600', sea: '#F2A15B',
    place: 'Tripoli', spot: 'The Citadel, Tripoli', particles: ['curryleaf', 'chilli', 'dust'],
  },
  fried: {
    id: 'fried', tones: ['#FFDCCD', '#E8735A', '#A63A1F'], accent: '#7A2E12', ink: '#3D1408', sea: '#4B9FC4',
    place: 'Saida', spot: 'Sea Castle, Saida', particles: ['noodle', 'shallot', 'chilli'],
  },
  kfiery: {
    id: 'kfiery', tones: ['#DDF1FF', '#8CCBFF', '#FF8A3D'], accent: '#E8411E', ink: '#0E2F55', sea: '#52A8E8',
    place: 'Zahle', spot: 'Berdawni river, Zahle', particles: ['flame', 'sesame', 'chilli'],
  },
  kmush: {
    id: 'kmush', tones: ['#DEEBFF', '#7FB0F0', '#1F4FA8'], accent: '#D92B3A', ink: '#0B1F45', sea: '#5C8FD6',
    place: 'Bekaa', spot: 'Baalbek, Bekaa', particles: ['mushroom', 'chilli', 'sesame'],
  },
};

export const PLACES_RIGHT: Place[] = ['Tripoli', 'Batroun', 'Beirut'];
export const PLACES_LEFT: Place[] = ['Saida', 'Tyre', 'Bekaa', 'Zahle'];

export function themeForPlace(place: Place): Theme {
  return Object.values(THEMES).find((t) => t.place === place)!;
}
