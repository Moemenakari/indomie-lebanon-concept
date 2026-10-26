import { act, fireEvent, render, screen } from '@testing-library/react';
import { ConceptModal, NOTICE_REPEAT_MS } from './Chrome';

describe('ConceptModal', () => {
  it('shows on every visit and comes back a minute after closing', () => {
    vi.useFakeTimers();
    render(<ConceptModal />);
    expect(screen.getByRole('dialog')).toHaveTextContent('not the official Indomie website');
    fireEvent.click(screen.getByRole('button', { name: /I understand/ }));
    expect(screen.queryByRole('dialog')).toBeNull();
    act(() => { vi.advanceTimersByTime(NOTICE_REPEAT_MS); });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
