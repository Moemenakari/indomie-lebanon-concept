import type { Format } from '../../data/products';

const CupIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14l-1.6 13a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3Z" /><path d="M4 5.5h16" strokeWidth="2.4" /><path d="M9 3c0 1 1 1 1 2M14 3c0 1 1 1 1 2" /></svg>
);
const PackIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5l1.3-1.2L6.6 5l1.3-1.2L9.2 5l1.3-1.2L11.8 5l1.3-1.2L14.4 5l1.3-1.2L17 5l1.3-1.2L20 5v14l-1.3 1.2L17.4 19l-1.3 1.2-1.3-1.2-1.3 1.2-1.3-1.2-1.3 1.2L9.6 19l-1.3 1.2L7 19l-1.3 1.2L4 19Z" /><path d="M7.5 10.5h9M7.5 14h6" /></svg>
);

/** One vertical pill, like a phone's brightness slider: cup on top, pack below. */
export function FormatSwitch({ value, onChange }: { value: Format; onChange: (f: Format) => void }) {
  const opts: { f: Format; label: string; Icon: () => JSX.Element }[] = [
    { f: 'cup', label: 'Cups', Icon: CupIcon },
    { f: 'pack', label: 'Packs', Icon: PackIcon },
  ];
  return (
    <div className="fswitch" role="radiogroup" aria-label="Product format" data-value={value}>
      <span className="fswitch-thumb" aria-hidden="true" />
      {opts.map(({ f, label, Icon }) => (
        <button
          key={f}
          type="button"
          role="radio"
          aria-checked={value === f}
          aria-label={label}
          className="fswitch-opt"
          onClick={() => onChange(f)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') onChange('cup');
            if (e.key === 'ArrowDown') onChange('pack');
          }}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
