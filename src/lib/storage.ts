/** localStorage can throw (private mode, blocked storage) — never let it break the page. */
export function readFlag(key: string): boolean {
  try { return window.localStorage.getItem(key) === '1'; } catch { return false; }
}
export function writeFlag(key: string): void {
  try { window.localStorage.setItem(key, '1'); } catch { /* ignore */ }
}
