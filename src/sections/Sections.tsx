import { motion } from 'framer-motion';
import { SITE } from '../config/site';
import { PRODUCTS, photoFor } from '../data/products';
import { THEMES, themeForPlace, type Place, type Theme } from '../data/themes';
import { RoadSign } from '../components/RoadSign';
import { ProductArt } from '../components/hero/ProductArt';

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
} as const;

const ARRIVALS: { id: string; date: string; line: string }[] = [
  { id: 'pack-hot-spicy', date: '12 Oct 2026', line: 'Summer may be over, but the heat is just getting started.' },
  { id: 'pack-korean-fiery', date: '3 Sep 2026', line: 'Korea came to Lebanon: chewy noodles, fiery sauce.' },
  { id: 'pack-korean-mushroom', date: '3 Sep 2026', line: 'Earthy mushroom with a proper kick.' },
];

export function NewArrivals({ onPick }: { onPick: (id: string) => void }) {
  return (
    <section id="new" className="section">
      <motion.header className="section-head" {...reveal}>
        <p className="kicker">Just landed</p>
        <h2>New arrivals</h2>
      </motion.header>
      <div className="arrivals">
        {ARRIVALS.map((a, i) => {
          const p = PRODUCTS.find((x) => x.id === a.id)!;
          const t = THEMES[p.theme];
          return (
            <motion.button key={a.id} type="button" className="arrival" onClick={() => onPick(p.id)}
              style={{ background: `linear-gradient(150deg, ${t.tones[0]}, ${t.tones[1]})`, color: t.ink }}
              {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }} whileHover={{ y: -6 }}>
              <span className="arrival-date">{a.date}</span>
              <span className="arrival-art">{photoFor(p) ? <img src={photoFor(p)!} alt={p.name} loading="lazy" /> : <ProductArt product={p} />}</span>
              <span className="arrival-name">{p.name}</span>
              <span className="arrival-line">{a.line}</span>
              <span className="arrival-cta">See it in the hero →</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

// Lebanon outline, projected from rough lon/lat border points.
const BORDER: [number, number][] = [
  [35.97, 34.64], [36.35, 34.65], [36.45, 34.59], [36.62, 34.47], [36.6, 34.2], [36.36, 33.84], [36.27, 33.62],
  [35.98, 33.42], [35.82, 33.3], [35.6, 33.27], [35.1, 33.09], [35.2, 33.27], [35.37, 33.56], [35.47, 33.89],
  [35.62, 34.0], [35.64, 34.12], [35.66, 34.25], [35.72, 34.33], [35.82, 34.44],
];
const CITIES: Record<Place, [number, number]> = {
  Tripoli: [35.84, 34.43], Batroun: [35.66, 34.25], Beirut: [35.5, 33.89], Saida: [35.38, 33.56],
  Tyre: [35.2, 33.27], Zahle: [35.9, 33.85], Bekaa: [36.2, 34.0],
};
const proj = ([lon, lat]: [number, number]): [number, number] => [((lon - 35.05) / 1.62) * 220 + 10, ((34.72 - lat) / 1.66) * 330 + 10];

export function TasteOfLebanon({ current, onPlace }: { current: Theme; onPlace: (p: Place) => void }) {
  const outline = BORDER.map((pt, i) => `${i ? 'L' : 'M'}${proj(pt).join(' ')}`).join(' ') + ' Z';
  return (
    <section id="lebanon" className="section lebanon">
      <motion.header className="section-head" {...reveal}>
        <p className="kicker">Every flavour has a home</p>
        <h2>Taste of Lebanon</h2>
        <p className="lede">Each flavour is paired with a Lebanese place. Tap a sign or a city and the hero takes you there.</p>
      </motion.header>
      <div className="lebanon-grid">
        <motion.div {...reveal}><RoadSign current={current.place} onPick={onPlace} /></motion.div>
        <motion.svg className="map" viewBox="0 0 240 350" {...reveal} role="group" aria-label="Map of Lebanon">
          <path d={outline} fill={current.tones[0]} stroke={current.tones[2]} strokeWidth={2.5} strokeLinejoin="round" />
          {(Object.keys(CITIES) as Place[]).map((place) => {
            const [x, y] = proj(CITIES[place]);
            const on = place === current.place;
            const t = themeForPlace(place);
            return (
              <g key={place} className="map-city" role="button" tabIndex={0} aria-label={`${place}: ${t.spot}`} aria-pressed={on}
                onClick={() => onPlace(place)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPlace(place)}>
                {on && <circle cx={x} cy={y} r={14} fill={t.tones[2]} opacity={0.25} className="map-pulse" />}
                <circle cx={x} cy={y} r={on ? 7 : 5} fill={t.tones[2]} stroke="#fff" strokeWidth={2} />
                <text x={x + (place === 'Bekaa' || place === 'Zahle' ? 10 : -10)} y={y + 4} textAnchor={place === 'Bekaa' || place === 'Zahle' ? 'start' : 'end'}>{place}</text>
              </g>
            );
          })}
        </motion.svg>
      </div>
    </section>
  );
}

type Ingredient = { name: string; img: string };
const PANELS: { bg: string; items: Ingredient[] }[] = [
  { bg: '#EEA33A', items: [{ name: 'Mixed peppers', img: 'peppers' }, { name: 'Peas', img: 'peas' }] },
  { bg: '#C9A57A', items: [{ name: 'Onion', img: 'onion' }, { name: 'Carrot', img: 'carrot' }, { name: 'Mushrooms', img: 'mushrooms' }] },
];

/** A real bowl photo with its name curved over the rim, like the 23 Sep recipe post. */
function IngredientBowl({ ing, delay, big }: { ing: Ingredient; delay: number; big?: boolean }) {
  const id = ing.img;
  const r = big ? 62 : 46;
  return (
    <motion.figure className={`ing${big ? ' ing-big' : ''}`} initial={{ opacity: 0, scale: 0.7, rotate: -12 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }} transition={{ type: 'spring', stiffness: 140, damping: 14, delay }}>
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <defs><path id={`arc-${id}`} d={big ? 'M10 96 A70 70 0 0 1 64 12' : `M${80 - r - 10} 80 A${r + 10} ${r + 10} 0 0 1 ${80 + r + 10} 80`} /></defs>
        <text className="ing-label"><textPath href={`#arc-${id}`} startOffset="50%" textAnchor="middle">{ing.name.toUpperCase()}</textPath></text>
      </svg>
      <img src={`/recipe/${ing.img}.webp`} alt={ing.name} loading="lazy" style={{ width: `${(r * 2 * 100) / 160}%` }} />
    </motion.figure>
  );
}

export function Recipe({ theme }: { theme: Theme }) {
  return (
    <section id="recipe" className="section recipe" style={{ background: `linear-gradient(180deg, ${theme.tones[0]}, #fff)` }}>
      <motion.header className="section-head" {...reveal}>
        <p className="kicker">Recipe</p>
        <h2>Indomie brings it all together</h2>
        <p className="lede">Add colourful veggies and grilled chicken for a plate full of flavour. Based on the recipe Indomie Lebanon shared on 23 Sep 2026.</p>
      </motion.header>
      <div className="recipe-board">
        <div className="panel panel-a" style={{ background: PANELS[0].bg }}>
          {PANELS[0].items.map((ing, i) => <IngredientBowl key={ing.name} ing={ing} delay={i * 0.1} />)}
        </div>
        <div className="panel panel-chicken"><IngredientBowl ing={{ name: 'Chicken', img: 'chicken' }} delay={0.25} big /></div>
        <div className="panel panel-b" style={{ background: PANELS[1].bg }}>
          {PANELS[1].items.map((ing, i) => <IngredientBowl key={ing.name} ing={ing} delay={0.2 + i * 0.1} />)}
        </div>
      </div>
      <motion.ol className="steps" {...reveal}>
        <li><b>Cook</b> one pack of Indomie Fried for 3 minutes, then drain.</li>
        <li><b>Stir-fry</b> the vegetables and chicken for 4 minutes on high heat.</li>
        <li><b>Toss</b> with the seasoning, sauces and crispy shallots. Serve hot.</li>
      </motion.ol>
    </section>
  );
}

export function WhereToBuy() {
  return (
    <section id="buy" className="section">
      <motion.div className="buy-card" {...reveal}>
        <div>
          <p className="kicker">Where to buy</p>
          <h2>Order from Al Sultan Food Stuff</h2>
          <p className="lede">All {PRODUCTS.length} products on this page link straight to their real page on sfs.com.lb. No fake checkout.</p>
        </div>
        <a className="btn btn-primary" href={SITE.sourceUrl} target="_blank" rel="noreferrer">Shop Indomie on SFS ↗</a>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a className="wordmark" href="#/">indomie <small>Lebanon</small></a>
        <p>{SITE.tagline}. Designed &amp; built by <a href={SITE.linkedinUrl} target="_blank" rel="noreferrer">{SITE.author}</a>.</p>
      </div>
      <p className="fine">
        Unofficial concept, not affiliated with Indomie or its distributors. Product photos and prices from sfs.com.lb (Al Sultan Food Stuff), checked {SITE.checkedOn}.
        Recipe photos from @indomielebanon (23 Sep 2026). Indomie is a trademark of its owner. Scenes and illustrations are original.
      </p>
      <div className="footer-links">
        <a href={SITE.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={SITE.githubUrl} target="_blank" rel="noreferrer">Source code</a>
        <a href="#/privacy">Privacy</a>
        <a href="#/careers">Careers</a>
      </div>
    </footer>
  );
}

