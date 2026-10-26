import type { ReactNode } from 'react';

/** Group that drifts with the pointer: deeper layers move more. */
export function Layer({ depth, children }: { depth: number; children: ReactNode }) {
  return (
    <g style={{ transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.35}px))`, transition: 'transform 0.6s ease-out' }}>
      {children}
    </g>
  );
}

/** Scalloped band from the campaign posters. */
export function WaveBand({ y, color, r = 22, w = 1000 }: { y: number; color: string; r?: number; w?: number }) {
  let d = `M0 500 L0 ${y}`;
  for (let x = 0; x < w; x += r * 2) d += ` a${r} ${r} 0 0 1 ${r * 2} 0`;
  d += ` L${w} 500 Z`;
  return <path d={d} fill={color} />;
}

export function Palm({ x, y, h, color, lean = 1 }: { x: number; y: number; h: number; color: string; lean?: number }) {
  const tx = x + 26 * lean;
  const ty = y - h;
  const fronds = [-150, -115, -70, -30, 10, 40];
  return (
    <g>
      <path d={`M${x - 6} ${y} Q${x + 12 * lean} ${y - h / 2} ${tx - 3} ${ty} L${tx + 4} ${ty} Q${x + 20 * lean} ${y - h / 2} ${x + 7} ${y} Z`} fill={color} />
      {fronds.map((a) => {
        const rad = (a * Math.PI) / 180;
        const ex = tx + Math.cos(rad) * 70;
        const ey = ty + Math.sin(rad) * 38 + 26;
        return <path key={a} d={`M${tx} ${ty} Q${(tx + ex) / 2} ${ty - 30} ${ex} ${ey} Q${(tx + ex) / 2} ${ty - 12} ${tx} ${ty} Z`} fill={color} />;
      })}
      <circle cx={tx} cy={ty + 6} r={6} fill={color} />
    </g>
  );
}

export function Cedar({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-5} y={-40} width={10} height={40} fill={color} opacity={0.85} />
      <path d="M0 -150 L18 -128 L8 -128 L36 -100 L20 -100 L56 -66 L30 -66 L70 -34 L-70 -34 L-30 -66 L-56 -66 L-20 -100 L-36 -100 L-8 -128 L-18 -128 Z" fill={color} />
    </g>
  );
}

export function House({ x, y, w, h, wall, roof }: { x: number; y: number; w: number; h: number; wall: string; roof: string }) {
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={wall} rx={2} />
      <path d={`M${x - 6} ${y - h} L${x + w / 2} ${y - h - w * 0.38} L${x + w + 6} ${y - h} Z`} fill={roof} />
      <path d={`M${x + w * 0.2} ${y - h * 0.15} v${-h * 0.45} a${w * 0.12} ${w * 0.12} 0 0 1 ${w * 0.24} 0 v${h * 0.45} Z`} fill={roof} opacity={0.55} />
      <path d={`M${x + w * 0.58} ${y - h * 0.15} v${-h * 0.45} a${w * 0.12} ${w * 0.12} 0 0 1 ${w * 0.24} 0 v${h * 0.45} Z`} fill={roof} opacity={0.55} />
    </g>
  );
}

export function Boat({ x, y, s, hull, sail }: { x: number; y: number; s: number; hull: string; sail: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-40 0 L40 0 L28 14 L-28 14 Z" fill={hull} />
      <path d="M2 -4 L2 -62 L34 -6 Z" fill={sail} />
      <path d="M-2 -4 L-2 -48 L-26 -6 Z" fill={sail} opacity={0.8} />
    </g>
  );
}

/** Soft horizontal stripes for sea or fields. */
export function Stripes({ y, h, color, n = 4 }: { y: number; h: number; color: string; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={0} y={y + (h / n) * i + h / n / 2} width={1000} height={2} fill={color} opacity={0.35 - i * 0.05} rx={1} />
      ))}
    </g>
  );
}

export function Crenels({ x, y, w, color, size = 12 }: { x: number; y: number; w: number; color: string; size?: number }) {
  const n = Math.floor(w / (size * 2));
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x + i * size * 2 + size / 2} y={y - size} width={size} height={size + 1} fill={color} />
      ))}
    </g>
  );
}
