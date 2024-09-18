import { describe, it, expect } from 'vitest';
import { setupCounter } from './counter';

describe('setupCounter', () => {
  it('should set up a counter correctly', () => {
    const button = document.createElement('button');
    setupCounter(button);

    expect(button.innerHTML).toBe('count is 0');

    button.click();
    expect(button.innerHTML).toBe('count is 1');

    button.click();
    expect(button.innerHTML).toBe('count is 2');
  });

  it('should handle null element gracefully', () => {
    expect(() => setupCounter(null)).not.toThrow();
  });
});
