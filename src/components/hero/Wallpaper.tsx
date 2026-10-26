import { AnimatePresence, motion } from 'framer-motion';
import type { Theme } from '../../data/themes';
import { Scene } from '../../scenes/Scenes';

/** Campaign doodles: the sun spiral, noodle squiggles and an outlined ring. */
function Motifs({ color, ring }: { color: string; ring: string }) {
  const squiggle = 'M0 0 q10 -14 20 0 t20 0 t20 0 t20 0 t20 0 t20 0';
  return (
    <svg className="motifs" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
      <path d={squiggle} transform="translate(30 150) rotate(-28) scale(1.6)" stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d={squiggle} transform="translate(820 640) rotate(32) scale(1.4)" stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />
      <g transform="translate(905 170)">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={-4} y={-58} width={8} height={18} rx={4} fill={color} transform={`rotate(${i * 30})`} />
        ))}
        <path d="M0 0 m-4 0 a4 4 0 1 1 8 0 a10 10 0 1 1 -18 2 a16 16 0 1 1 30 -4 a22 22 0 1 1 -38 6" stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
      <circle cx={90} cy={760} r={70} stroke={ring} strokeOpacity={0.35} strokeWidth={10} fill="none" />
    </svg>
  );
}

/** Flavour wallpaper: layered campaign circles, a giant flavour word and the Lebanese scene. Cross-fades on change. */
export function Wallpaper({ theme, word }: { theme: Theme; word: string }) {
  const [l, m, d] = theme.tones;
  const bg = `radial-gradient(circle at 50% 44%, ${m} 0 13vmax, ${l} 13vmax 21vmax, ${m}aa 21vmax 28vmax, ${l} 28vmax 36vmax, ${m}66 36vmax 42vmax, ${l} 42vmax), linear-gradient(${l}, ${d})`;
  return (
    <div className="wallpaper" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={theme.id}
          className="wp-layer"
          style={{ background: bg }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="wp-dots" />
          <div className="wp-word" style={{ color: d }}>{word}</div>
          <Motifs color={theme.id === 'veg' ? '#F5D33D' : '#FFD84D'} ring={d} />
          <Scene theme={theme} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
