import { useEffect, useState } from 'react';
import { SITE } from '../config/site';

export function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#flavours', label: 'Flavours' },
    { href: '#new', label: 'New' },
    { href: '#lebanon', label: 'Taste of Lebanon' },
    { href: '#recipe', label: 'Recipe' },
    { href: '#buy', label: 'Where to buy' },
    { href: '#/about', label: 'About' },
  ];
  return (
    <header className="nav">
      <a className="wordmark" href="#/" aria-label="Indomie Lebanon concept, home">indomie <small>Lebanon</small></a>
      <button type="button" className="burger" aria-expanded={open} aria-controls="nav-links" aria-label="Menu" onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
      <nav id="nav-links" className={open ? 'open' : ''}>
        {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
        <a className="nav-cta" href="#/products" onClick={() => setOpen(false)}>All products</a>
      </nav>
    </header>
  );
}

/** Always on screen so every recording carries the credit. */
export function ConceptBadge() {
  return (
    <a className="concept-badge" href={SITE.linkedinUrl} target="_blank" rel="noreferrer">
      <span className="dot" aria-hidden="true" /> Unofficial concept · <strong>{SITE.author}</strong>
    </a>
  );
}

/** How long after closing the notice before it shows again. */
export const NOTICE_REPEAT_MS = 60_000;

/** The disclaimer opens on every visit and comes back a minute after it's closed. */
export function ConceptModal() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (show) return;
    const id = window.setTimeout(() => setShow(true), NOTICE_REPEAT_MS);
    return () => window.clearTimeout(id);
  }, [show]);
  if (!show) return null;
  const close = () => setShow(false);
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="concept-title" onKeyDown={(e) => e.key === 'Escape' && close()}>
      <div className="modal">
        <span className="modal-chip">Unofficial website · UI/UX demo</span>
        <h2 id="concept-title">This is not the official Indomie website.</h2>
        <p>
          It's a demo homepage, built to test UI/UX ideas: a marketing and design experiment for the Lebanese market.
          All trademarks, product names and photos belong to their respective owners.
        </p>
        <div className="modal-note">
          <strong>No ordering or payment happens here.</strong> Want to buy? Contact{' '}
          <a href={SITE.indomieUrl} target="_blank" rel="noreferrer">Indomie Lebanon</a> directly, or shop on{' '}
          <a href={SITE.sourceUrl} target="_blank" rel="noreferrer">sfs.com.lb</a>.
        </div>
        <p className="by">Thank you for your understanding. Designed &amp; built by <a href={SITE.linkedinUrl} target="_blank" rel="noreferrer">{SITE.author}</a></p>
        <div className="modal-actions">
          <button type="button" className="btn btn-primary" onClick={close} autoFocus>I understand, explore the demo</button>
          <a className="btn btn-ghost" href={SITE.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>
    </div>
  );
}

export function ComingSoon({ page }: { page: string }) {
  return (
    <main className="soon">
      <div className="soon-card">
        <span className="modal-chip">{page || 'Page'} · coming soon</span>
        <h1>We focused on the homepage.</h1>
        <p>This concept was an experiment in one page done properly. This page is coming soon, if the community wants it.</p>
        <div className="modal-actions">
          <a className="btn btn-primary" href="#/">Back to the homepage</a>
          <a className="btn btn-ghost" href={SITE.linkedinUrl} target="_blank" rel="noreferrer">Tell {SITE.author.split(' ')[0]} ↗</a>
        </div>
      </div>
    </main>
  );
}
