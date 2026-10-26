import { fireEvent, render, screen } from '@testing-library/react';
import { FormatSwitch } from './FormatSwitch';

describe('FormatSwitch', () => {
  it('marks the current format and reports changes', () => {
    const onChange = vi.fn();
    render(<FormatSwitch value="pack" onChange={onChange} />);
    expect(screen.getByRole('radio', { name: 'Packs' })).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(screen.getByRole('radio', { name: 'Cups' }));
    expect(onChange).toHaveBeenCalledWith('cup');
  });

  it('supports arrow keys', () => {
    const onChange = vi.fn();
    render(<FormatSwitch value="cup" onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Cups' }), { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith('pack');
  });
});
