import { PLACES_LEFT, PLACES_RIGHT, type Place } from '../data/themes';

/** Road-sign arrow: thick shaft with a wide head, as on Lebanese direction signs. */
const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg className="arrow" viewBox="0 0 40 24" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M2 9h22V2l14 10-14 10v-7H2Z" fill="currentColor" />
  </svg>
);

interface Props {
  current: Place;
  onPick?: (place: Place) => void;
  compact?: boolean;
}

/** A blue Lebanese direction sign: north-bound places to the right, south and east to the left. */
export function RoadSign({ current, onPick, compact }: Props) {
  const row = (place: Place, dir: 'left' | 'right') => {
    const on = place === current;
    const content = (
      <>
        {dir === 'left' && <Arrow flip />}
        <span className="name">{place}</span>
        {dir === 'right' && <Arrow />}
      </>
    );
    return onPick ? (
      <button key={place} type="button" className={`sign-row ${dir}${on ? ' on' : ''}`} onClick={() => onPick(place)} aria-pressed={on}>{content}</button>
    ) : (
      <div key={place} className={`sign-row ${dir}${on ? ' on' : ''}`}>{content}</div>
    );
  };
  const board = (places: Place[], dir: 'left' | 'right') => (
    <div className="sign-board">
      {['tl', 'tr', 'bl', 'br'].map((b) => <i key={b} className={`bolt ${b}`} aria-hidden="true" />)}
      {places.map((p) => row(p, dir))}
    </div>
  );
  return (
    <div className={`roadsign${compact ? ' compact' : ''}`} aria-label="Road sign of Lebanese regions">
      <div className="sign-boards">
        {board(PLACES_RIGHT, 'right')}
        {board(PLACES_LEFT, 'left')}
      </div>
      <span className="sign-pole" aria-hidden="true"><i className="clamp c1" /><i className="clamp c2" /></span>
      <span className="sign-base" aria-hidden="true" />
    </div>
  );
}
