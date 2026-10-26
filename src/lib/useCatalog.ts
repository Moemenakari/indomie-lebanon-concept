import { useCallback, useMemo, useState } from 'react';
import { byFormat, PRODUCTS, type Format } from '../data/products';
import { THEMES, type Place } from '../data/themes';
import { nearestPos, wrapIndex } from './ring';

/** Hero state: which format is showing and where each format's wheel is parked. */
export function useCatalog() {
  const [format, setFormat] = useState<Format>('pack');
  const [pos, setPos] = useState<Record<Format, number>>({ pack: 0, cup: 0 });

  const items = useMemo(() => byFormat(format), [format]);
  const product = items[wrapIndex(pos[format], items.length)];
  const theme = THEMES[product.theme];

  const step = useCallback((d: number) => setPos((p) => ({ ...p, [format]: p[format] + d })), [format]);

  const jumpTo = useCallback((id: string) => {
    const target = PRODUCTS.find((p) => p.id === id);
    if (!target) return;
    const list = byFormat(target.format);
    setFormat(target.format);
    setPos((p) => ({ ...p, [target.format]: nearestPos(p[target.format], list.indexOf(target), list.length) }));
  }, []);

  /** Prefer a product of the current format from that place; otherwise switch format. */
  const jumpToPlace = useCallback((place: Place) => {
    const match = (f: Format) => byFormat(f).find((p) => THEMES[p.theme].place === place);
    const hit = match(format) ?? match(format === 'pack' ? 'cup' : 'pack');
    if (hit) jumpTo(hit.id);
  }, [format, jumpTo]);

  return { format, setFormat, items, pos: pos[format], product, theme, step, jumpTo, jumpToPlace };
}
