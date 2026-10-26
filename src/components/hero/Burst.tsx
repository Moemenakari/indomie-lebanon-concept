import { memo } from 'react';
import type { ThemeId } from '../../data/themes';

const FIERY: ThemeId[] = ['hot', 'kfiery', 'fried', 'curry'];
const FLAKES: Record<ThemeId, string[]> = {
  hot: ['#E3242B', '#B3141B', '#F7A21B'],
  kfiery: ['#E3242B', '#F26B21', '#F5E6C4'],
  fried: ['#B3141B', '#8A4B1E', '#F2C14E'],
  curry: ['#D9452B', '#F0A03A', '#4E7A2A'],
  chicken: ['#C77A2E', '#3F8F3A', '#F3D27A'],
  veg: ['#6DBE45', '#F57C21', '#2E7D32'],
  kmush: ['#B98A5E', '#E3242B', '#ffffff'],
};

/** The campaign "explosion" behind the hero product: flame tongues (or soft rays) and flying flakes. */
export const Burst = memo(function Burst({ theme }: { theme: ThemeId }) {
  let s = 7;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const fiery = FIERY.includes(theme);
  const petals = Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * 360 + rnd() * 8;
    const len = 52 + rnd() * 40;
    const w = 7 + rnd() * 7;
    return { a, d: `M0 -18 C${w} ${-18 - len * 0.4} ${w * 0.4} ${-18 - len * 0.8} 0 ${-18 - len} C${-w * 0.4} ${-18 - len * 0.8} ${-w} ${-18 - len * 0.4} 0 -18 Z` };
  });
  const flakes = Array.from({ length: 46 }, (_, i) => {
    const a = rnd() * Math.PI * 2;
    const r = 40 + rnd() * 62;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r, s: 1.2 + rnd() * 2.6, rot: rnd() * 180, c: FLAKES[theme][i % 3] };
  });
  return (
    <svg className="burst" viewBox="-110 -110 220 220" aria-hidden="true">
      <g className="burst-petals">
        {petals.map((p, i) => (
          <path key={i} d={p.d} transform={`rotate(${p.a})`} fill={fiery ? (i % 3 ? '#FFF1B8' : '#FFD36B') : '#ffffff'} opacity={fiery ? 0.85 : 0.5} />
        ))}
      </g>
      <g className="burst-flakes">
        {flakes.map((f, i) => (
          <rect key={i} x={f.x} y={f.y} width={f.s * 1.6} height={f.s} rx={f.s / 2} fill={f.c} transform={`rotate(${f.rot} ${f.x} ${f.y})`} />
        ))}
      </g>
    </svg>
  );
});
