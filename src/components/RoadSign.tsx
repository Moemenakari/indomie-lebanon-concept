import { PLACES_LEFT, PLACES_RIGHT, type Place } from '../data/themes';

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
        {dir === 'left' && <span className="arrow" aria-hidden="true">←</span>}
        <span className="name">{place}</span>
        {dir === 'right' && <span className="arrow" aria-hidden="true">→</span>}
      </>
    );
    return onPick ? (
      <button key={place} type="button" className={`sign-row ${dir}${on ? ' on' : ''}`} onClick={() => onPick(place)} aria-pressed={on}>{content}</button>
    ) : (
      <div key={place} className={`sign-row ${dir}${on ? ' on' : ''}`}>{content}</div>
    );
  };
  return (
    <div className={`roadsign${compact ? ' compact' : ''}`} aria-label="Road sign of Lebanese regions">
      <div className="sign-boards">
        <div className="sign-board">{PLACES_RIGHT.map((p) => row(p, 'right'))}</div>
        <div className="sign-board">{PLACES_LEFT.map((p) => row(p, 'left'))}</div>
      </div>
      <span className="sign-pole" aria-hidden="true" />
    </div>
  );
}
