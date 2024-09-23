import { describe, it, expect, vi } from 'vitest';
import { WrappedButton, wrapButton, customAddEventListener } from './testUtils';

describe('WrappedButton', () => {
  it('should create a WrappedButton instance', () => {
    const mockElement = { addEventListener: vi.fn(), click: vi.fn() } as unknown as HTMLButtonElement;
    const wrappedButton = new WrappedButton(mockElement);
    expect(wrappedButton).toBeInstanceOf(WrappedButton);
    expect(wrappedButton.element).toBe(mockElement);
  });

  it('should add event listener for click events', () => {
    const mockElement = { addEventListener: vi.fn(), click: vi.fn() } as unknown as HTMLButtonElement;
    const wrappedButton = new WrappedButton(mockElement);
    const listener = vi.fn();
    wrappedButton.addEventListener('click', listener);
    expect(mockElement.addEventListener).toHaveBeenCalledWith('click', listener, undefined);
  });

  it('should trigger click event', () => {
    const mockElement = { addEventListener: vi.fn(), click: vi.fn() } as unknown as HTMLButtonElement;
    const wrappedButton = new WrappedButton(mockElement);
    const listener = vi.fn();
    wrappedButton.addEventListener('click', listener);
    wrappedButton.click();
    expect(listener).toHaveBeenCalled();
    expect(mockElement.click).toHaveBeenCalled();
  });
});

describe('wrapButton', () => {
  it('should create a WrappedButton instance', () => {
    const mockElement = { addEventListener: vi.fn(), click: vi.fn() } as unknown as HTMLButtonElement;
    const wrappedButton = wrapButton(mockElement);
    expect(wrappedButton).toBeInstanceOf(WrappedButton);
    expect(wrappedButton.element).toBe(mockElement);
  });
});

describe('customAddEventListener', () => {
  it('should add event listener to WrappedButton', () => {
    const mockElement = { addEventListener: vi.fn(), click: vi.fn() } as unknown as HTMLButtonElement;
    const wrappedButton = new WrappedButton(mockElement);
    const listener = vi.fn();
    customAddEventListener(wrappedButton as unknown as HTMLElement, 'click', listener);
    expect(mockElement.addEventListener).toHaveBeenCalledWith('click', listener, undefined);
  });

  it('should add event listener to regular HTMLElement', () => {
    const mockElement = { addEventListener: vi.fn() } as unknown as HTMLElement;
    const listener = vi.fn();
    customAddEventListener(mockElement, 'click', listener);
    expect(mockElement.addEventListener).toHaveBeenCalledWith('click', listener, undefined);
  });
});
