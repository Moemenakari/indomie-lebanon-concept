import { PRODUCTS, byFormat } from './products';
import { THEMES, PLACES_LEFT, PLACES_RIGHT, themeForPlace } from './themes';

describe('catalogue', () => {
  it('has 8 packs (Hot & Spicy first) and 6 cups', () => {
    expect(byFormat('pack')).toHaveLength(8);
    expect(byFormat('pack')[0].id).toBe('pack-hot-spicy');
    expect(byFormat('cup')).toHaveLength(6);
  });

  it('links every product to a real SFS page and a known theme', () => {
    for (const p of PRODUCTS) {
      expect(p.url).toMatch(/^https:\/\/sfs\.com\.lb\/shop\//);
      expect(THEMES[p.theme]).toBeDefined();
    }
  });

  it('gives every road-sign place exactly one theme with three tones', () => {
    for (const place of [...PLACES_RIGHT, ...PLACES_LEFT]) {
      const t = themeForPlace(place);
      expect(t.tones).toHaveLength(3);
      expect(new Set(t.tones).size).toBe(3);
    }
  });
});
