import { useEffect, useState } from 'react';
import { SITE } from '../config/site';
import { readFlag, writeFlag } from '../lib/storage';

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

const SEEN = 'indomie-concept-seen';

export function ConceptModal({ skip }: { skip: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!skip && !readFlag(SEEN)) setShow(true);
  }, [skip]);
  if (!show) return null;
  const close = () => { writeFlag(SEEN); setShow(false); };
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="concept-title" onKeyDown={(e) => e.key === 'Escape' && close()}>
      <div className="modal">
        <span className="modal-chip">Concept · not the official site</span>
        <h2 id="concept-title">This is a simple homepage template.</h2>
        <p>
          An unofficial concept: a marketing experiment for brands in the Lebanese market, and extra practice for the developer.
          Real products and prices from SFS. Scenes, motion and 3D built from scratch.
        </p>
        <p className="by">Designed &amp; built by <a href={SITE.linkedinUrl} target="_blank" rel="noreferrer">{SITE.author}</a></p>
        <div className="modal-actions">
          <button type="button" className="btn btn-primary" onClick={close} autoFocus>Explore the concept</button>
          <a className="btn btn-ghost" href={SITE.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
        <a className="modal-src" href={SITE.githubUrl} target="_blank" rel="noreferrer">Source code on GitHub</a>
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
