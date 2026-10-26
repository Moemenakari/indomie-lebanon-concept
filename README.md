# Indomie Lebanon: a homepage concept

**Live:** [indomie-lebanon-concept.vercel.app](https://indomie-lebanon-concept.vercel.app) · add `?demo=1` to the link for the hands-free version

I wanted to see what a brand homepage for the Lebanese market could look like if every flavour got its own world. So I picked a brand I see in every dekkene, studied what Indomie Lebanon is posting on Instagram right now, and built the homepage I'd pitch them.

> This is an unofficial concept, a personal project. It isn't affiliated with Indomie, its distributors or SFS.

![Desktop hero](docs/desktop-hero.png)

| Phone (400px) | Cup mode |
|---|---|
| <img src="docs/phone-hero.png" width="260"> | <img src="docs/desktop-cup.png" width="520"> |

## The idea

Indomie Lebanon's latest campaign is pink, loud and full of chillies: *"الصيفية خلصت بس الجديد وصل"*. I took that look and pushed it further. Every flavour gets a wallpaper made of its own colours, a Lebanese place and real 3D ingredients floating behind the pack.

| Flavour | Place | Floating behind it |
|---|---|---|
| Hot & Spicy (new) | Raouche, Beirut | chillies, flames, embers |
| Chicken | Batroun's Phoenician wall | drumsticks, herbs, noodles |
| Vegetable | A village in South Lebanon | peas, carrot, broccoli |
| Curry | Tripoli Citadel | curry leaves, chilli, spice |
| Fried / Mi Goreng | Saida Sea Castle | noodle swirls, shallots |
| Korean Fiery Chicken | Berdawni river, Zahle | flames, sesame |
| Korean Spicy Mushroom | Baalbek, Bekaa | mushrooms, chillies |

## What you can do on the page

- **Spin the wheel.** Products sit on a circle, not in a row. Swipe, tap a neighbour or use ← →, and the next pack rises from the side of the wheel into the centre.
- **Flip Cup / Pack.** A vertical pill, like the brightness slider on a phone. Flip it and the whole catalogue swaps, along with the colours, scene and particles.
- **Follow the road sign.** A Lebanese direction sign lights up the town of the flavour you're on. In *Taste of Lebanon*, tap a sign or a city on the map and the hero jumps there.
- **Cook the recipe.** The fried noodle recipe Indomie Lebanon posted on 23 Sep, laid out the way their post does it.
- **Order.** Every "Order" button opens the real product page on SFS. There is no fake checkout.

## How it's built

- **React 18 + TypeScript (strict) + Vite.**
- **Three.js through React Three Fiber** for the ingredients. They're instanced meshes, lazy-loaded so they don't block the first paint. Phones get fewer of them, and they're switched off for anyone with *reduce motion* on.
- **Framer Motion** for the wheel springs and the wallpaper cross-fades.
- **The scenes are hand-built SVG layers.** Raouche, the citadel and Baalbek's columns are all vectors that drift with the mouse for a bit of parallax. There are no stock photos behind them.
- **Carousel maths lives in one pure module** (`src/lib/ring.ts`): wrap-around, shortest path round the circle, and position, scale and depth for each slot. It's unit tested on its own, so the UI stays dumb.
- **A theme system.** Each flavour is a typed theme (three tones, accent, place, particles), and the whole page reads it through CSS variables. That's why the nav, buttons, footer and map all change with the product.
- **Real product photos, kept off SFS's servers.** A GitHub Action downloads the photos from SFS, cuts out the white background with `sharp` (flood fill from the edges with a soft edge) and commits them as WebP. They went from 13 MB to 1.2 MB, and the site never hotlinks.
- **A real map.** The Lebanon outline is projected from Natural Earth 1:10m data, and cities sit at their real coordinates.
- **Accessibility.** You can use the keyboard for the wheel, the switch and the map, the focus rings are visible, and the switch uses proper radio and listbox roles.

### Tests

```bash
npm test                         # Vitest: ring maths, catalogue, themes, format switch, state hook
npm run build && npm run e2e     # Playwright smoke test at 400×860 and 1440×900
```

The smoke test opens the page on a phone and a desktop size. It checks the intro modal, rotates the wheel with the keyboard, taps a neighbour, flips to cups, opens a "coming soon" page and fails on any console error. It also saves screenshots to `shots/`.

## Run it

```bash
npm install
npm run dev
```

To refresh the product photos, run the **Fetch product photos** workflow from the Actions tab.

## Credits

- Product names, prices and photos come from [sfs.com.lb](https://sfs.com.lb/?s=indomie&post_type=product) (Al Sultan Food Stuff), checked 26 Oct 2026.
- The recipe photos and campaign references come from [@indomielebanon](https://www.instagram.com/indomielebanon/).
- Map data: [Natural Earth](https://www.naturalearthdata.com/).
- Indomie is a trademark of its owner.

---

Designed and built by **Moemen Akkari**, a front-end and full-stack developer in Tripoli, Lebanon.
Open to work. Let's talk on [LinkedIn](https://www.linkedin.com/in/moemen-akari-1b94811b5/).
