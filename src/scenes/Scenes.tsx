import type { Theme, ThemeId } from '../data/themes';
import { Boat, Cedar, Crenels, House, Layer, Palm, Stripes, WaveBand } from './parts';

type P = { t: Theme };

/** Beirut — Raouche pigeon rocks at sunset, palms on the corniche. */
function Raouche({ t }: P) {
  const [l, m, d] = t.tones;
  return (
    <>
      <Layer depth={-6}>
        <circle cx={760} cy={250} r={120} fill={l} opacity={0.7} />
        <g fill={d} opacity={0.35}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={40 + i * 52} y={300 - ((i * 37) % 60)} width={36} height={80 + ((i * 37) % 60)} rx={3} />)}
        </g>
      </Layer>
      <rect x={0} y={370} width={1000} height={130} fill={t.sea} />
      <Stripes y={375} h={90} color={l} />
      <Layer depth={-12}>
        <path d="M640 420 C646 340 672 268 716 238 C752 214 796 236 812 296 C822 336 826 380 826 420 Z" fill={d} />
        <path d="M688 420 C692 372 716 350 738 368 C752 380 756 402 756 420 Z" fill={t.sea} />
        <path d="M716 238 C740 228 764 240 772 262 C748 252 732 256 716 268 Z" fill={l} opacity={0.4} />
        <path d="M848 420 C850 360 868 324 892 322 C912 322 924 360 926 420 Z" fill={d} opacity={0.9} />
        <path d="M600 420 h360" stroke={l} strokeWidth={4} opacity={0.6} strokeLinecap="round" />
        <Boat x={560} y={405} s={0.5} hull={t.ink} sail={l} />
      </Layer>
      <Layer depth={-22}>
        <Palm x={980} y={470} h={220} color={t.ink} lean={-1} />
        <Palm x={120} y={470} h={200} color={t.ink} />
        <Palm x={210} y={470} h={150} color={t.ink} lean={1.2} />
      </Layer>
      <WaveBand y={448} color={m} r={26} />
      <WaveBand y={470} color={d} r={18} />
    </>
  );
}

/** Batroun — the old Phoenician sea wall, a small chapel, fishing boats. */
function Batroun({ t }: P) {
  const [l, m, d] = t.tones;
  return (
    <>
      <Layer depth={-5}>
        <circle cx={770} cy={230} r={110} fill={m} opacity={0.9} />
        <circle cx={770} cy={230} r={150} fill={l} opacity={0.35} />
      </Layer>
      <rect x={0} y={355} width={1000} height={145} fill={t.sea} />
      <Stripes y={360} h={100} color="#ffffff" n={5} />
      <Layer depth={-12}>
        <path d="M540 410 L1000 382 L1000 432 L540 440 Z" fill={d} />
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M${560 + i * 32} ${410 - i * 2} v28`} stroke={t.ink} strokeOpacity={0.25} strokeWidth={2} />
        ))}
        <path d="M540 424 L1000 404" stroke={t.ink} strokeOpacity={0.2} strokeWidth={2} />
        <g transform="translate(700 404)">
          <rect x={-34} y={-52} width={68} height={52} fill="#fffaf0" />
          <path d="M-40 -52 L0 -78 L40 -52 Z" fill={t.accent} />
          <rect x={-8} y={-110} width={16} height={34} fill="#fffaf0" />
          <path d="M-12 -110 L0 -126 L12 -110 Z" fill={t.accent} />
          <path d="M-10 0 v-26 a10 10 0 0 1 20 0 v26 Z" fill={t.sea} />
        </g>
        <Boat x={900} y={372} s={0.6} hull={t.accent} sail="#fffaf0" />
        <Boat x={600} y={440} s={0.45} hull={t.ink} sail="#fffaf0" />
      </Layer>
      <Layer depth={-20}>
        <path d="M0 470 C120 430 220 440 320 470 Z" fill={d} opacity={0.6} />
      </Layer>
      <WaveBand y={452} color={m} r={24} />
      <WaveBand y={472} color={d} r={16} />
    </>
  );
}

/** South Lebanon village — terraced hills, stone houses with red tiles, a cedar. */
function Village({ t }: P) {
  const [l, m, d] = t.tones;
  return (
    <>
      <Layer depth={-5}>
        <circle cx={860} cy={180} r={56} fill="#fff6cf" opacity={0.9} />
        <path d="M0 330 C180 250 360 290 520 250 C680 210 820 250 1000 220 L1000 500 L0 500 Z" fill={m} opacity={0.65} />
      </Layer>
      <Layer depth={-12}>
        <path d="M0 380 C200 330 420 360 560 330 C700 300 860 310 1000 290 L1000 500 L0 500 Z" fill={d} opacity={0.75} />
        {[340, 370, 400].map((y, i) => (
          <path key={y} d={`M520 ${y + 20} C700 ${y - 10} 860 ${y - 6} 1000 ${y - 26}`} stroke={l} strokeOpacity={0.45 - i * 0.1} strokeWidth={3} fill="none" />
        ))}
        <House x={640} y={350} w={58} h={46} wall="#f6ead2" roof="#c8553d" />
        <House x={712} y={338} w={70} h={56} wall="#efe0c2" roof="#b8452f" />
        <House x={800} y={330} w={52} h={42} wall="#f6ead2" roof="#c8553d" />
        <g transform="translate(872 326)">
          <rect x={-12} y={-90} width={24} height={90} fill="#efe0c2" />
          <path d="M-16 -90 L0 -116 L16 -90 Z" fill="#b8452f" />
          <path d="M-6 -60 v-16 a6 6 0 0 1 12 0 v16 Z" fill={t.ink} opacity={0.6} />
        </g>
        {[600, 940].map((x) => <circle key={x} cx={x} cy={350} r={20} fill={t.accent} opacity={0.85} />)}
      </Layer>
      <Layer depth={-22}>
        <Cedar x={560} y={470} s={1.15} color={t.ink} />
        <Cedar x={110} y={470} s={0.9} color={t.ink} />
        <Cedar x={980} y={470} s={0.75} color={t.ink} />
      </Layer>
      <WaveBand y={452} color={m} r={24} />
      <WaveBand y={472} color={d} r={16} />
    </>
  );
}

/** Tripoli — the citadel of Raymond de Saint-Gilles on its hill, a minaret below. */
function Citadel({ t }: P) {
  const [l, m, d] = t.tones;
  const stone = t.ink;
  return (
    <>
      <Layer depth={-5}>
        <circle cx={300} cy={230} r={90} fill={l} opacity={0.8} />
        <g fill={d} opacity={0.3}>
          {[60, 140, 220, 300, 380].map((x, i) => <path key={x} d={`M${x} 400 v-40 a28 28 0 0 1 56 0 v40 Z`} opacity={0.6 + i * 0.05} />)}
        </g>
      </Layer>
      <Layer depth={-12}>
        <path d="M480 470 C560 400 600 340 660 330 L900 322 C950 330 980 380 1000 400 L1000 500 L480 500 Z" fill={d} />
        <g fill={stone} opacity={0.9}>
          <rect x={630} y={250} width={300} height={80} />
          <Crenels x={630} y={250} w={300} color={stone} />
          <rect x={612} y={210} width={46} height={120} />
          <Crenels x={612} y={210} w={46} color={stone} size={10} />
          <rect x={760} y={196} width={56} height={134} />
          <Crenels x={760} y={196} w={56} color={stone} size={10} />
          <rect x={900} y={224} width={44} height={106} />
          <Crenels x={900} y={224} w={44} color={stone} size={10} />
        </g>
        {[680, 720, 860].map((x) => <path key={x} d={`M${x} 300 v-18 a7 7 0 0 1 14 0 v18 Z`} fill={m} />)}
        <path d="M778 236 v-16 a10 10 0 0 1 20 0 v16 Z" fill={m} />
      </Layer>
      <Layer depth={-20}>
        <g fill={t.ink}>
          <rect x={540} y={250} width={22} height={220} />
          <rect x={534} y={300} width={34} height={8} />
          <path d="M540 250 C540 226 562 226 562 250 Z" />
          <path d="M551 214 v14" stroke={t.ink} strokeWidth={3} />
          <path d="M380 470 v-50 a40 40 0 0 1 80 0 v50 Z" />
          <path d="M60 470 v-30 a30 30 0 0 1 60 0 v30 Z" opacity={0.8} />
        </g>
      </Layer>
      <WaveBand y={452} color={m} r={24} />
      <WaveBand y={472} color={d} r={16} />
    </>
  );
}

/** Saida — the Crusader sea castle on its islet, joined by the arched causeway. */
function SeaCastle({ t }: P) {
  const [l, m, d] = t.tones;
  return (
    <>
      <Layer depth={-5}>
        <circle cx={820} cy={210} r={100} fill={l} opacity={0.75} />
      </Layer>
      <rect x={0} y={370} width={1000} height={130} fill={t.sea} />
      <Stripes y={375} h={90} color="#ffffff" />
      <Layer depth={-12}>
        <path d="M520 384 L720 384 L720 396 L520 396 Z" fill={d} />
        {[540, 580, 620, 660, 700].map((x) => <path key={x} d={`M${x - 14} 396 h28 v24 a14 14 0 0 0 -28 0 Z`} fill={d} />)}
        <path d="M700 420 C710 400 940 400 960 420 Z" fill={t.ink} opacity={0.5} />
        <g fill={d}>
          <rect x={720} y={300} width={120} height={104} />
          <Crenels x={720} y={300} w={120} color={d} />
          <rect x={830} y={330} width={100} height={74} />
          <Crenels x={830} y={330} w={100} color={d} />
          <rect x={740} y={258} width={50} height={46} />
          <Crenels x={740} y={258} w={50} color={d} size={10} />
        </g>
        {[750, 790, 860, 900].map((x) => <rect key={x} x={x} y={350} width={8} height={18} rx={4} fill={t.ink} opacity={0.5} />)}
        <Boat x={600} y={440} s={0.55} hull={t.accent} sail={l} />
      </Layer>
      <Layer depth={-20}>
        <Palm x={90} y={470} h={190} color={t.ink} />
        <Palm x={970} y={470} h={170} color={t.ink} lean={-1} />
      </Layer>
      <WaveBand y={452} color={m} r={24} />
      <WaveBand y={472} color={d} r={16} />
    </>
  );
}

/** Zahle — Our Lady of Zahle on the hill, the Berdawni river and its vines. */
function Zahle({ t }: P) {
  const [l, m, d] = t.tones;
  return (
    <>
      <Layer depth={-5}>
        <path d="M0 320 C200 230 380 270 540 220 C700 170 860 220 1000 190 L1000 500 L0 500 Z" fill={m} opacity={0.7} />
      </Layer>
      <Layer depth={-12}>
        <path d="M480 420 C620 330 760 290 860 280 C930 276 980 300 1000 320 L1000 500 L480 500 Z" fill={t.ink} opacity={0.75} />
        <g transform="translate(830 282)" fill={l}>
          <rect x={-10} y={-120} width={20} height={120} />
          <rect x={-16} y={-126} width={32} height={8} />
          <path d="M0 -168 C-8 -160 -9 -142 -6 -126 L6 -126 C9 -142 8 -160 0 -168 Z" fill={d} />
          <circle cx={0} cy={-172} r={6} fill={d} />
        </g>
        <path d="M380 500 C460 450 560 470 640 430 C720 392 820 420 1000 380 L1000 410 C840 446 740 420 660 456 C580 492 480 480 430 500 Z" fill={t.sea} />
        <path d="M480 482 C560 470 620 462 680 446" stroke="#fff" strokeOpacity={0.6} strokeWidth={3} fill="none" />
      </Layer>
      <Layer depth={-20}>
        <path d="M0 300 H360" stroke={t.ink} strokeWidth={6} />
        {[30, 120, 210, 300].map((x) => <rect key={x} x={x - 3} y={300} width={6} height={170} fill={t.ink} />)}
        {[50, 90, 150, 190, 250, 330].map((x, i) => (
          <g key={x} fill="#6b2a6f" transform={`translate(${x} ${312 + (i % 2) * 8})`}>
            <path d="M-10 -12 Q0 -26 10 -12 Z" fill={t.accent} opacity={0.8} />
            {[[0, 0], [-6, 0], [6, 0], [-3, 7], [3, 7], [0, 14]].map(([gx, gy], k) => <circle key={k} cx={gx} cy={gy} r={4.5} />)}
          </g>
        ))}
        <g transform="translate(560 430)">
          <path d="M0 0 v40" stroke={t.ink} strokeWidth={4} />
          <path d="M-46 0 Q0 -30 46 0 Z" fill={t.accent} />
        </g>
      </Layer>
      <WaveBand y={452} color={l} r={24} />
      <WaveBand y={472} color={d} r={16} />
    </>
  );
}

/** Bekaa — open striped fields and the six columns of Baalbek. */
function Baalbek({ t }: P) {
  const [l, m, d] = t.tones;
  return (
    <>
      <Layer depth={-5}>
        <path d="M0 300 L120 210 L240 280 L360 190 L520 290 L1000 300 L1000 500 L0 500 Z" fill={m} opacity={0.6} />
        <path d="M520 300 L640 220 L760 270 L880 200 L1000 260 L1000 500 L520 500 Z" fill={m} opacity={0.85} />
        <path d="M360 190 L385 208 L372 214 L350 200 Z" fill="#fff" opacity={0.8} />
        <path d="M880 200 L905 218 L890 222 L868 210 Z" fill="#fff" opacity={0.8} />
      </Layer>
      <Layer depth={-10}>
        {['#e7c96a', '#9cc06a', '#d79a4a', '#b9d47e', '#e8b85a'].map((c, i) => (
          <path key={c} d={`M0 ${330 + i * 28} L1000 ${320 + i * 30} L1000 ${348 + i * 30} L0 ${358 + i * 28} Z`} fill={c} opacity={0.85} />
        ))}
      </Layer>
      <Layer depth={-16}>
        <g fill={l}>
          <rect x={630} y={210} width={240} height={26} />
          <rect x={622} y={236} width={256} height={12} />
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={642 + i * 42} y={248} width={22} height={140} rx={3} />)}
          <rect x={620} y={386} width={260} height={16} />
        </g>
        <g fill={d} opacity={0.3}>
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={656 + i * 42} y={248} width={6} height={140} />)}
        </g>
      </Layer>
      <WaveBand y={452} color={m} r={24} />
      <WaveBand y={472} color={d} r={16} />
    </>
  );
}

const SCENES: Record<ThemeId, (p: P) => JSX.Element> = {
  hot: Raouche, chicken: Batroun, veg: Village, curry: Citadel, fried: SeaCastle, kfiery: Zahle, kmush: Baalbek,
};

export function Scene({ theme }: { theme: Theme }) {
  const S = SCENES[theme.id];
  return (
    <svg className="scene" viewBox="0 0 1000 500" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
      <S t={theme} />
    </svg>
  );
}
