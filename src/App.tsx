import { useEffect, useState, type CSSProperties } from 'react';
import { ComingSoon, ConceptBadge, ConceptModal, Nav } from './components/Chrome';
import { Hero } from './components/hero/Hero';
import { useCatalog } from './lib/useCatalog';
import { PRODUCTS, photoFor } from './data/products';
import { Footer, NewArrivals, Recipe, TasteOfLebanon, WhereToBuy } from './sections/Sections';

const routeOf = () => (window.location.hash.startsWith('#/') ? window.location.hash.slice(2) : '');

export default function App() {
  const c = useCatalog();
  const [route, setRoute] = useState(routeOf);
  const demo = new URLSearchParams(window.location.search).has('demo');

  useEffect(() => {
    const on = () => { setRoute(routeOf()); if (window.location.hash.startsWith('#/')) window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // ?demo=1 — hands-free run for screen recordings: rotate, flip to cups once, keep rotating.
  const { step, setFormat } = c;
  useEffect(() => {
    if (!demo) return;
    let ticks = 0;
    const id = window.setInterval(() => {
      ticks += 1;
      if (ticks === 5) setFormat('cup');
      else step(1);
    }, 2500);
    return () => window.clearInterval(id);
  }, [demo, step, setFormat]);

  // Warm the cache with every product photo once the page is idle, so the wheel never waits on one.
  useEffect(() => {
    const warm = () => PRODUCTS.forEach((p) => { const src = photoFor(p); if (src) new Image().src = src; });
    const id = window.setTimeout(warm, 3000);
    return () => window.clearTimeout(id);
  }, []);

  const [l, m, d] = c.theme.tones;
  const vars = { '--t0': l, '--t1': m, '--t2': d, '--accent': c.theme.accent, '--ink': c.theme.ink } as CSSProperties;

  const top = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="app" style={vars}>
      <Nav />
      {route && route !== '' ? (
        <ComingSoon page={route.charAt(0).toUpperCase() + route.slice(1)} />
      ) : (
        <main>
          <Hero format={c.format} onFormat={c.setFormat} items={c.items} pos={c.pos} onStep={c.step} product={c.product} theme={c.theme} />
          <NewArrivals onPick={(id) => { c.jumpTo(id); top(); }} />
          <TasteOfLebanon current={c.theme} onPlace={(p) => { c.jumpToPlace(p); top(); }} />
          <Recipe theme={c.theme} />
          <WhereToBuy />
        </main>
      )}
      <Footer />
      <ConceptBadge />
      <ConceptModal />
    </div>
  );
}
