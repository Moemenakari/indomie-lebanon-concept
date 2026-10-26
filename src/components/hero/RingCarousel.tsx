import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { Product } from '../../data/products';
import { ringPose, signedOffset, wrapIndex } from '../../lib/ring';
import { ProductVisual } from './ProductVisual';

interface Props {
  items: Product[];
  pos: number;
  radius: number;
  onStep: (delta: number) => void;
}

/** Products ride a wheel: the active one at the top, neighbours falling away round the circle. */
export function RingCarousel({ items, pos, radius, onStep }: Props) {
  const n = items.length;
  const active = wrapIndex(pos, n);
  const drag = useRef<{ x: number; id: number } | null>(null);

  return (
    <div
      className="ring"
      role="listbox"
      aria-label="Products"
      aria-activedescendant={`ring-${items[active].id}`}
      onPointerDown={(e) => { drag.current = { x: e.clientX, id: e.pointerId }; }}
      onPointerUp={(e) => {
        const d = drag.current;
        drag.current = null;
        if (!d) return;
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > 40) onStep(dx < 0 ? 1 : -1);
      }}
    >
      {items.map((p, i) => {
        const off = signedOffset(i, active, n);
        const pose = ringPose(off, { radius });
        return (
          <motion.button
            key={p.id}
            id={`ring-${p.id}`}
            type="button"
            role="option"
            aria-selected={off === 0}
            aria-label={`${p.name}${off === 0 ? ' (selected)' : ''}`}
            tabIndex={Math.abs(off) <= 1 ? 0 : -1}
            className="ring-item"
            initial={false}
            animate={{ x: pose.x, y: pose.y, scale: pose.scale, rotate: pose.rotate, opacity: pose.opacity }}
            transition={{ type: 'spring', stiffness: 110, damping: 19, opacity: { duration: pose.opacity ? 0.45 : 0.18 } }}
            style={{ zIndex: pose.z, pointerEvents: pose.opacity ? 'auto' : 'none' }}
            onClick={() => off !== 0 && onStep(off)}
          >
            <ProductVisual product={p} active={off === 0} />
          </motion.button>
        );
      })}
    </div>
  );
}
