import type { ThemeId } from './themes';
import { PHOTOS } from './photos';

export type Format = 'cup' | 'pack';

export interface Product {
  id: string;
  format: Format;
  name: string;
  flavour: string;
  weight: string;
  price: string;
  url: string;
  imageSrc: string;
  theme: ThemeId;
  badge?: 'NEW ARRIVAL' | 'NEW';
  blurb: string;
}

const SFS = 'https://sfs.com.lb/shop/';
const UP = 'https://sfs.com.lb/wp-content/uploads/';

export const PRODUCTS: Product[] = [
  // Packs — the new Hot & Spicy leads.
  { id: 'pack-hot-spicy', format: 'pack', name: 'Fried Hot & Spicy', flavour: 'Hot & Spicy', weight: '80 g', price: '$0.42',
    url: `${SFS}indomie-pillow-fried-hot-and-spicy-80-gr/`, imageSrc: `${UP}2026/04/GPD-NEW-scaled.webp`, theme: 'hot', badge: 'NEW ARRIVAL',
    blurb: 'Summer may be over, but the heat is just getting started.' },
  { id: 'pack-fried', format: 'pack', name: 'Fried', flavour: 'Mi Goreng', weight: '80 g', price: '$0.36',
    url: `${SFS}indomie-pillow-fried-80-gr/`, imageSrc: `${UP}2024/12/INDOMIE-Pillow-FRIED-80-GR-scaled.webp`, theme: 'fried',
    blurb: 'The original dry noodle. Sweet soy, crispy shallots, no soup needed.' },
  { id: 'pack-special-chicken', format: 'pack', name: 'Special Chicken', flavour: 'Special Chicken', weight: '75 g', price: '$0.33',
    url: `${SFS}indomie-pillow-special-chicken-75gr/`, imageSrc: `${UP}2024/12/Special-Chicken-Flavor.webp`, theme: 'chicken',
    blurb: 'A richer chicken broth with a little extra seasoning.' },
  { id: 'pack-chicken', format: 'pack', name: 'Chicken', flavour: 'Chicken', weight: '70 g', price: '$0.28',
    url: `${SFS}indomie-pillow-chicken-70-gr/`, imageSrc: `${UP}2024/12/Baladi-Chicken-Flavor-60g-scaled.webp`, theme: 'chicken',
    blurb: 'The classic. Three minutes from pack to bowl.' },
  { id: 'pack-chicken-curry', format: 'pack', name: 'Chicken Curry', flavour: 'Chicken Curry', weight: '75 g', price: '$0.33',
    url: `${SFS}indomie-pillow-chicken-curry-75-gr/`, imageSrc: `${UP}2024/12/Chicken-Curry-Pillow.webp`, theme: 'curry',
    blurb: 'Warm curry spice on a chicken broth. Gentle heat.' },
  { id: 'pack-vegetable', format: 'pack', name: 'Vegetable with Oil', flavour: 'Vegetable', weight: '75 g', price: '$0.33',
    url: `${SFS}indomie-pillow-vegetable-with-oil-75gr/`, imageSrc: `${UP}2024/12/Vegetable-V1.webp`, theme: 'veg',
    blurb: 'A light vegetable broth, finished with seasoned oil.' },
  { id: 'pack-korean-fiery', format: 'pack', name: 'Korean Fiery Chicken', flavour: 'Korean Fiery Chicken', weight: '94 g', price: '$15 / 4×5',
    url: `${SFS}indomie-korean-fiery-chicken-4594g/`, imageSrc: `${UP}2026/08/Indomie-Korean-Fiery-Chicken-IPKF-ME-Packshot-01-Dec-2025-1.webp`, theme: 'kfiery', badge: 'NEW',
    blurb: 'Thick chewy noodles in a sweet and fiery Korean-style sauce.' },
  { id: 'pack-korean-mushroom', format: 'pack', name: 'Korean Spicy Mushroom', flavour: 'Korean Spicy Mushroom', weight: '83 g', price: '$15 / 4×5',
    url: `${SFS}indomie-korean-spicy-mushroom-4583g/`, imageSrc: `${UP}2026/08/Indomie-Korean-Spicy-Mushroom-IPKS-ME-Packshot-01-Dec-2025.webp`, theme: 'kmush', badge: 'NEW',
    blurb: 'Earthy mushroom with a spicy kick.' },
  // Cups — 3 flavours × 2 sizes.
  { id: 'cup-chicken', format: 'cup', name: 'Cup Chicken', flavour: 'Chicken', weight: '60 g', price: '$0.69',
    url: `${SFS}indomie-cup-chicken-noodle-60gr/`, imageSrc: `${UP}2024/12/Cup-Chicken-V1.webp`, theme: 'chicken',
    blurb: 'Add hot water, wait three minutes, done.' },
  { id: 'cup-curry', format: 'cup', name: 'Cup Curry', flavour: 'Curry', weight: '60 g', price: '$0.69',
    url: `${SFS}indomie-cup-curry-noodle-60gr/`, imageSrc: `${UP}2024/12/Cup-Curry-V1.webp`, theme: 'curry',
    blurb: 'Curry in a cup, ready anywhere.' },
  { id: 'cup-vegetable', format: 'cup', name: 'Cup Vegetable', flavour: 'Vegetable', weight: '60 g', price: '$0.69',
    url: `${SFS}indomie-cup-vegetable-60gr/`, imageSrc: `${UP}2025/11/Cup-Vegetable-V1.webp`, theme: 'veg',
    blurb: 'A light vegetable cup for any break.' },
  { id: 'jumbo-chicken', format: 'cup', name: 'Jumbo Cup Chicken', flavour: 'Chicken', weight: '80 g', price: '$0.93',
    url: `${SFS}indomie-jumbo-cup-chicken-noodle-80-gr/`, imageSrc: `${UP}2025/11/CUP-JUMBO-CHICKEN-80g-scaled.webp`, theme: 'chicken',
    blurb: 'The bigger cup, for the bigger hunger.' },
  { id: 'jumbo-curry', format: 'cup', name: 'Jumbo Cup Curry', flavour: 'Curry', weight: '82 g', price: '$0.93',
    url: `${SFS}indomie-jumbo-cup-curry-noodle-82-gr/`, imageSrc: `${UP}2025/11/CUP-JUMBO-CURRY-82g-scaled.webp`, theme: 'curry',
    blurb: 'More noodles, more curry.' },
  { id: 'jumbo-vegetable', format: 'cup', name: 'Jumbo Cup Vegetable', flavour: 'Vegetable', weight: '82 g', price: '$0.93',
    url: `${SFS}indomie-jumbo-cup-vegetable-82-gr/`, imageSrc: `${UP}2025/11/CUP-JUMBO-VEGETABLE-82g-scaled.webp`, theme: 'veg',
    blurb: 'Jumbo size, light vegetable broth.' },
];

export const byFormat = (format: Format) => PRODUCTS.filter((p) => p.format === format);
export const photoFor = (p: Product) => (PHOTOS.has(p.id) ? `/products/${p.id}.webp` : null);
