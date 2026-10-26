import { act, renderHook } from '@testing-library/react';
import { useCatalog } from './useCatalog';

describe('useCatalog', () => {
  it('starts on the new Hot & Spicy pack with its pink theme', () => {
    const { result } = renderHook(() => useCatalog());
    expect(result.current.product.id).toBe('pack-hot-spicy');
    expect(result.current.theme.id).toBe('hot');
  });

  it('switching to cups shows only cups and changes the theme', () => {
    const { result } = renderHook(() => useCatalog());
    act(() => result.current.setFormat('cup'));
    expect(result.current.items.every((p) => p.format === 'cup')).toBe(true);
    expect(result.current.theme.id).toBe('chicken');
  });

  it('rotates and wraps round the wheel', () => {
    const { result } = renderHook(() => useCatalog());
    act(() => result.current.step(-1));
    expect(result.current.product.id).toBe('pack-korean-mushroom');
  });

  it('jumps to a place, switching format when needed', () => {
    const { result } = renderHook(() => useCatalog());
    act(() => result.current.jumpToPlace('Tripoli'));
    expect(result.current.theme.place).toBe('Tripoli');
    act(() => result.current.setFormat('cup'));
    act(() => result.current.jumpToPlace('Bekaa'));
    expect(result.current.format).toBe('pack');
    expect(result.current.product.id).toBe('pack-korean-mushroom');
  });
});
