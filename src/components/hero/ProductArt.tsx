import { useId } from 'react';
import type { Product } from '../../data/products';
import { THEMES } from '../../data/themes';

/** Drawn stand-in for a product until its real photo is cut out (see scripts/fetch-images.mjs). */
export function ProductArt({ product }: { product: Product }) {
  const t = THEMES[product.theme];
  const uid = useId().replace(/:/g, '');
  const cup = product.format === 'cup';
  const shape = cup
    ? 'M28 46 L172 46 L152 252 Q100 262 48 252 Z'
    : 'M14 26 l9 -8 l9 8 l9 -8 l9 8 l9 -8 l9 8 l9 -8 l9 8 l9 -8 l9 8 l9 -8 l9 8 l9 -8 l9 8 l9 -8 l9 8 l9 -8 l9 8 l9 -8 L186 26 L190 238 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 L10 238 Z';
  const words = product.flavour.toUpperCase().split(' ');
  return (
    <svg viewBox="0 0 200 270" className="art" role="img" aria-label={`${product.name} ${cup ? 'cup' : 'pack'}`}>
      <defs>
        <linearGradient id={`g${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.tones[2]} />
          <stop offset="1" stopColor={t.accent} />
        </linearGradient>
        <linearGradient id={`s${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`c${uid}`}><path d={shape} /></clipPath>
      </defs>
      <g clipPath={`url(#c${uid})`}>
        <path d={shape} fill={`url(#g${uid})`} />
        <circle cx={160} cy={40} r={70} fill={t.tones[1]} opacity={0.35} />
        <rect x={0} y={cup ? 70 : 52} width={200} height={46} fill="#fff" />
        <text x={100} y={cup ? 104 : 86} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight={800} fontSize={34} fill="#E4002B">indomie</text>
        {words.map((w, i) => (
          <text key={i} x={100} y={(cup ? 138 : 130) + i * 18} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight={800} fontSize={17} fill="#fff">{w}</text>
        ))}
        <g transform={`translate(100 ${cup ? 212 : 200})`}>
          <ellipse cx={0} cy={0} rx={56} ry={16} fill="#fff" opacity={0.95} />
          <path d="M-52 2 Q0 52 52 2 Z" fill="#fff" />
          <path d="M-40 -2 q8 -10 16 0 t16 0 t16 0 t16 0 t16 0" stroke="#F5C451" strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M-36 6 q8 -10 16 0 t16 0 t16 0 t16 0" stroke="#E8B23A" strokeWidth={5} fill="none" strokeLinecap="round" />
          <circle cx={-20} cy={-8} r={6} fill={t.accent} />
          <circle cx={16} cy={-9} r={5} fill="#5BAA3C" />
          <circle cx={30} cy={-4} r={4} fill={t.tones[2]} />
        </g>
        <text x={cup ? 100 : 170} y={cup ? 246 : 228} textAnchor={cup ? 'middle' : 'end'} fontFamily="Inter, sans-serif" fontWeight={700} fontSize={10} fill="#fff" opacity={0.9}>{product.weight}</text>
        <rect className="art-sheen" x={-120} y={-20} width={70} height={320} fill={`url(#s${uid})`} transform="skewX(-18)" />
      </g>
      {cup && <ellipse cx={100} cy={46} rx={72} ry={10} fill="#fff" opacity={0.9} />}
      {product.badge && (
        <g transform={`translate(${cup ? 160 : 168} ${cup ? 60 : 44}) rotate(12)`}>
          <circle r={22} fill="#FFD23F" />
          <text y={5} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight={800} fontSize={14} fill="#B3001B">NEW</text>
        </g>
      )}
    </svg>
  );
}
