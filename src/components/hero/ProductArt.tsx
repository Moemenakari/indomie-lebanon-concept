import { useId } from 'react';
import type { Product } from '../../data/products';
import type { ThemeId } from '../../data/themes';

/** Pack/cup colours, following the real packaging language (white face, red banner, flavour colour on the sides). */
const LOOK: Record<ThemeId, { side: string; sideDark: string; text: string; noodle: string; full?: boolean }> = {
  hot: { side: '#E3242B', sideDark: '#B3141B', text: '#E3242B', noodle: '#E8732C' },
  chicken: { side: '#F4C430', sideDark: '#D9A21B', text: '#D7262C', noodle: '#F3D27A' },
  veg: { side: '#4FA04A', sideDark: '#2F7A33', text: '#2F7A33', noodle: '#F3D27A' },
  curry: { side: '#EE7D22', sideDark: '#C95E12', text: '#D7262C', noodle: '#F1C55E' },
  fried: { side: '#E3242B', sideDark: '#B3141B', text: '#E3242B', noodle: '#D9822B' },
  kfiery: { side: '#F26B21', sideDark: '#E0301E', text: '#ffffff', noodle: '#C8361E', full: true },
  kmush: { side: '#2F86DD', sideDark: '#1C5FB3', text: '#ffffff', noodle: '#E9C77A', full: true },
};

function Banner({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <path d={`M${x} ${y} h${w} v30 q${-w / 2} 10 ${-w} 0 Z`} fill="#E4002B" />
      <path d={`M${x} ${y + 30} q${w / 2} 10 ${w} 0 v6 q${-w / 2} 10 ${-w} 0 Z`} fill="#FFD200" />
      <path d={`M${x} ${y + 36} q${w / 2} 10 ${w} 0 v6 q${-w / 2} 10 ${-w} 0 Z`} fill="#3AAA35" />
      <text x={x + w / 2} y={y + 23} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontStyle="italic" fontWeight={800} fontSize={22} fill="#fff" stroke="#1E63B6" strokeWidth={0.8} paintOrder="stroke">Indomie</text>
    </g>
  );
}

function Bowl({ cx, cy, r, noodle, garnish }: { cx: number; cy: number; r: number; noodle: string; garnish: string }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.62} fill="#222" opacity={0.9} />
      <ellipse cx={cx} cy={cy - 2} rx={r * 0.86} ry={r * 0.5} fill={noodle} />
      {[-0.5, -0.2, 0.1, 0.4].map((k, i) => (
        <path key={i} d={`M${cx - r * 0.7} ${cy + k * r * 0.6} q${r * 0.18} ${-r * 0.2} ${r * 0.35} 0 t${r * 0.35} 0 t${r * 0.35} 0 t${r * 0.35} 0`} stroke="#fff3c4" strokeOpacity={0.6} strokeWidth={1.6} fill="none" />
      ))}
      <circle cx={cx + r * 0.35} cy={cy - r * 0.15} r={r * 0.18} fill="#7CC04B" />
      <circle cx={cx - r * 0.3} cy={cy + r * 0.05} r={r * 0.1} fill={garnish} />
      <circle cx={cx + r * 0.05} cy={cy + r * 0.18} r={r * 0.08} fill={garnish} />
      <path d={`M${cx + r * 0.55} ${cy - r * 0.9} l${-r * 0.25} ${r * 0.7}`} stroke="#ccc" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/** Drawn stand-in for a product until its real photo is cut out (see scripts/fetch-images.mjs). */
export function ProductArt({ product }: { product: Product }) {
  const uid = useId().replace(/:/g, '');
  const look = LOOK[product.theme];
  const sheen = (
    <linearGradient id={`s${uid}`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#fff" stopOpacity="0" />
      <stop offset="0.5" stopColor="#fff" stopOpacity="0.6" />
      <stop offset="1" stopColor="#fff" stopOpacity="0" />
    </linearGradient>
  );
  const badge = product.badge && (
    <g transform="rotate(10)">
      <circle r={25} fill="#FFE14D" />
      <text y={-2} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight={800} fontSize={15} fill="#D7192D">New</text>
      <text y={15} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={13} fill="#D7192D">جديد</text>
    </g>
  );

  if (product.format === 'cup') {
    const shape = 'M24 40 L176 40 L156 254 Q100 262 44 254 Z';
    return (
      <svg viewBox="0 0 200 270" className="art" role="img" aria-label={`${product.name} cup`}>
        <defs>
          {sheen}
          <linearGradient id={`c${uid}`} x1="0" x2="1">
            <stop offset="0" stopColor={look.sideDark} />
            <stop offset="0.22" stopColor={look.side} />
            <stop offset="0.78" stopColor={look.side} />
            <stop offset="1" stopColor={look.sideDark} />
          </linearGradient>
          <clipPath id={`k${uid}`}><path d={shape} /></clipPath>
        </defs>
        <g clipPath={`url(#k${uid})`}>
          <path d={shape} fill={`url(#c${uid})`} />
          <path d="M52 40 L148 40 C150 100 146 200 140 256 L60 256 C54 200 50 100 52 40 Z" fill="#fbfbf8" />
          <path d="M52 40 C70 70 60 90 54 110" stroke="#d9d9d4" strokeWidth={6} fill="none" />
          <Banner x={56} y={44} w={88} />
          <text x={100} y={124} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight={800} fontStyle="italic" fontSize={product.flavour.length > 7 ? 19 : 23} fill={look.text}>{product.flavour}</text>
          <text x={100} y={140} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={9} letterSpacing={2.5} fill={look.text} opacity={0.8}>
            {product.name.startsWith('Jumbo') ? 'JUMBO · FLAVOUR' : 'FLAVOUR'}
          </text>
          <Bowl cx={100} cy={200} r={44} noodle={look.noodle} garnish={look.side} />
          <circle cx={140} cy={160} r={11} fill="#fff" stroke="#E4002B" strokeWidth={2} />
          <text x={140} y={165} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight={800} fontSize={13} fill="#E4002B">3</text>
          <rect className="art-sheen" x={-120} y={-20} width={70} height={320} fill={`url(#s${uid})`} transform="skewX(-18)" />
        </g>
        <ellipse cx={100} cy={40} rx={76} ry={8} fill="#f4f4f0" stroke="#d6d6d0" />
        {badge && <g transform="translate(170 70)">{badge}</g>}
      </svg>
    );
  }

  // Pillow pack, landscape like the real thing, with crimped short edges.
  const right = Array.from({ length: 17 }, (_, i) => `L${266 + (i % 2 ? 6 : 0)} ${14 + i * 10.75}`).join(' ');
  const left = Array.from({ length: 17 }, (_, i) => `L${14 - (i % 2 ? 6 : 0)} ${186 - i * 10.75}`).join(' ');
  const shape = `M14 14 L266 14 ${right} L14 186 ${left} Z`;
  const body = look.full ? `url(#b${uid})` : '#fbfbf8';
  return (
    <svg viewBox="0 0 280 200" className="art art-pack" role="img" aria-label={`${product.name} pack`}>
      <defs>
        {sheen}
        <linearGradient id={`b${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={look.side} />
          <stop offset="1" stopColor={look.sideDark} />
        </linearGradient>
        <clipPath id={`k${uid}`}><path d={shape} /></clipPath>
      </defs>
      <g clipPath={`url(#k${uid})`}>
        <path d={shape} fill={body} />
        {!look.full && (
          <>
            <rect x={0} y={0} width={24} height={200} fill={look.side} />
            <rect x={256} y={0} width={24} height={200} fill={look.side} />
          </>
        )}
        <Banner x={30} y={22} w={100} />
        <text x={36} y={100} fontFamily="Inter, sans-serif" fontWeight={700} fontSize={9} fill={look.full ? '#fff' : '#3AAA35'}>Instant Noodles</text>
        <g transform="rotate(-8 80 130)">
          <rect x={30} y={108} width={110} height={44} rx={6} fill={look.full ? 'rgba(0,0,0,.18)' : product.theme === 'hot' ? '#FFD200' : look.side} />
          {product.flavour.split(' ').reduce<string[]>((rows, w) => {
            const last = rows[rows.length - 1];
            if (last && (last + ' ' + w).length <= 12) rows[rows.length - 1] = `${last} ${w}`;
            else rows.push(w);
            return rows;
          }, []).slice(0, 2).map((row, i, all) => (
            <text key={i} x={85} y={(all.length === 1 ? 138 : 127) + i * 18} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight={800} fontStyle="italic" fontSize={18}
              fill={product.theme === 'hot' ? '#E3242B' : '#fff'}>{row}</text>
          ))}
        </g>
        <Bowl cx={196} cy={102} r={62} noodle={look.noodle} garnish={look.sideDark} />
        <path d="M150 168 h100 v18 h-100 Z" fill="#3AAA35" opacity={look.full ? 0 : 1} />
        <path d="M150 162 h100 v8 h-100 Z" fill="#FFD200" opacity={look.full ? 0 : 1} />
        <text x={250} y={182} textAnchor="end" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={9} fill="#fff">{product.weight}</text>
        <rect className="art-sheen" x={-140} y={-20} width={80} height={260} fill={`url(#s${uid})`} transform="skewX(-18)" />
      </g>
      {badge && <g transform="translate(250 30)">{badge}</g>}
    </svg>
  );
}
