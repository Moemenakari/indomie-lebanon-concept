import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { Format, Product } from '../../data/products';
import type { Theme } from '../../data/themes';
import { useMedia } from '../../lib/useMedia';
import { RoadSign } from '../RoadSign';
import { FormatSwitch } from './FormatSwitch';
import { RingCarousel } from './RingCarousel';
import { Wallpaper } from './Wallpaper';

const Particles = lazy(() => import('./Particles'));

interface Props {
  format: Format;
  onFormat: (f: Format) => void;
  items: Product[];
  pos: number;
  onStep: (d: number) => void;
  product: Product;
  theme: Theme;
}

export function Hero({ format, onFormat, items, pos, onStep, product, theme }: Props) {
  const ref = useRef<HTMLElement>(null);
  const phone = useMedia('(max-width: 760px)');
  const calm = useMedia('(prefers-reduced-motion: reduce)');
  const [ready, setReady] = useState(false);

  // The 3D layer is decoration. Desktop starts it once the page is idle; phones wait for the
  // first touch or scroll so the 800 KB of three.js never competes with the first paint.
  useEffect(() => {
    let idle = 0;
    const go = () => setReady(true);
    const interactions = ['pointerdown', 'scroll', 'keydown'] as const;
    const start = () => {
      if (phone && !new URLSearchParams(window.location.search).has('demo')) {
        interactions.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
        return;
      }
      idle = typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(go, { timeout: 2500 })
        : window.setTimeout(go, 1200);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      interactions.forEach((e) => window.removeEventListener(e, go));
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
    };
  }, [phone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input, textarea, [role="radiogroup"]')) return;
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onStep]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    ref.current.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <section id="flavours" ref={ref} className="hero" onPointerMove={onMove} aria-label="Featured flavours">
      <Wallpaper theme={theme} word={product.flavour} />
      {ready && !calm && (
        <Suspense fallback={null}>
          <Particles theme={theme} count={phone ? 16 : 36} />
        </Suspense>
      )}

      <div className="hero-inner">
        <div className="hero-copy" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <p className="eyebrow"><span className="pin" aria-hidden="true">●</span> {theme.spot}</p>
              {product.badge && <span className="sticker">{product.badge === 'NEW ARRIVAL' ? 'New arrival · جديد' : 'New'}</span>}
              <h1>{product.name}</h1>
              <p className="blurb">{product.blurb}</p>
              <div className="meta">
                <span>{product.format === 'cup' ? 'Cup' : 'Pack'}</span>
                <span>{product.weight}</span>
                <span className="price">{product.price}</span>
              </div>
              <a className="btn btn-primary" href={product.url} target="_blank" rel="noreferrer">Order on SFS <span aria-hidden="true">↗</span></a>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={format}
              className="wheel"
              initial={{ opacity: 0, rotate: -28 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 28 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <RingCarousel items={items} pos={pos} radius={phone ? 230 : 400} onStep={onStep} />
            </motion.div>
          </AnimatePresence>
          <button type="button" className="nav-arrow prev" onClick={() => onStep(-1)} aria-label="Previous product">‹</button>
          <button type="button" className="nav-arrow next" onClick={() => onStep(1)} aria-label="Next product">›</button>
          <div className="switch-slot"><FormatSwitch value={format} onChange={onFormat} /></div>
        </div>
      </div>

      <div className="hero-sign"><RoadSign current={theme.place} compact /></div>
      <a className="scroll-cue" href="#new" aria-label="Scroll to new arrivals"><span /></a>
    </section>
  );
}
