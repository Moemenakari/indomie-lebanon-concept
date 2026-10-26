import type { CSSProperties } from 'react';
import { photoFor, type Product } from '../../data/products';
import { Burst } from './Burst';
import { ProductArt } from './ProductArt';

/** A product with the hero treatment when active: spotlight, sheen sweep, float and floor reflection. */
export function ProductVisual({ product, active }: { product: Product; active: boolean }) {
  const photo = photoFor(product);
  const mask: CSSProperties | undefined = photo
    ? { WebkitMaskImage: `url(${photo})`, maskImage: `url(${photo})` }
    : undefined;
  return (
    <div className={`pv pv-${product.format}${active ? ' is-active' : ''}`}>
      <span className="pv-spot" aria-hidden="true" />
      {active && <Burst theme={product.theme} />}
      <div className="pv-float">
        <div className="pv-tilt">
          {photo ? (
            <>
              <img src={photo} alt={`${product.name}, ${product.weight}`} draggable={false} />
              <span className="pv-sheen" style={mask} aria-hidden="true" />
            </>
          ) : (
            <ProductArt product={product} />
          )}
        </div>
      </div>
      <span className="pv-floor" aria-hidden="true" />
    </div>
  );
}
