import { AnimatePresence, motion } from 'framer-motion';
import type { Theme } from '../../data/themes';
import { Scene } from '../../scenes/Scenes';

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
          <div className="wp-word" style={{ color: d }}>{word}</div>
          <Scene theme={theme} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
