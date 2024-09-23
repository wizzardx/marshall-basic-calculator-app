/**
 * A wrapper class for HTMLButtonElement that allows for custom event handling.
 * This class is useful for testing scenarios where you need more control over
 * event dispatching and listener management.
 */
export class WrappedButton implements Partial<HTMLButtonElement> {
  private listeners: EventListenerOrEventListenerObject[] = [];

  /**
   * Creates a new WrappedButton instance.
   * @param element The underlying HTMLButtonElement to wrap.
   */
  constructor(public element: HTMLButtonElement) {}

  /**
   * Adds an event listener to the wrapped button.
   * This method both adds the listener to the underlying element and
   * keeps track of click listeners for custom dispatching.
   *
   * @param type The type of event to listen for.
   * @param listener The listener function or object to add.
   * @param options An optional object specifying characteristics about the event listener.
   */
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    if (type === 'click') {
      this.listeners.push(listener);
    }
    this.element.addEventListener(type, listener, options);
  }

  /**
   * Simulates a click event on the wrapped button.
   * This method both triggers the click on the underlying element and
   * manually calls all registered click listeners.
   */
  click(): void {
    const event = new MouseEvent('click');
    this.listeners.forEach(listener => {
      if (typeof listener === 'function') {
        listener.call(this.element, event);
      } else {
        listener.handleEvent(event);
      }
    });
    this.element.click();
  }

  // Implement other necessary HTMLButtonElement properties and methods as needed
  // ...

  // Helper function to map the WrappedButton to an HTMLButtonElement
  /**
   * Converts the WrappedButton instance to an HTMLButtonElement.
   * This method is useful when you need to pass the wrapped
   * button to a function that expects an HTMLButtonElement.
   *
   * @returns the current WrappedButton instance, type asserted as an HTMLButtonElement.
   */
  toHTMLElement(): HTMLButtonElement {
    return this as unknown as HTMLButtonElement;
  }
}

/**
 * Creates a WrappedButton instance from an HTMLButtonElement.
 *
 * @param button The HTMLButtonElement to wrap.
 * @returns A new WrappedButton instance.
 *
 * @example
 * const realButton = document.createElement('button');
 * const wrappedButton = wrapButton(realButton);
 *
 * // Now you can use wrappedButton in your tests
 * wrappedButton.addEventListener('click', () => console.log('Button clicked!'));
 * wrappedButton.click(); // This will log: "Button clicked!"
 */
export function wrapButton(button: HTMLButtonElement): WrappedButton {
  return new WrappedButton(button);
}

/**
 * Type definition for a function that adds an event listener to an HTMLElement.
 */
export type AddEventListenerType = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => void;

/**
 * A custom implementation of addEventListener that works with both
 * regular HTMLElements and WrappedButtons.
 *
 * @param element The element to add the event listener to.
 * @param type The type of event to listen for.
 * @param listener The listener function to add.
 * @param options An optional object specifying characteristics about the event listener.
 *
 * @example
 * const button = document.createElement('button');
 * const wrappedButton = wrapButton(button);
 *
 * // Using with a regular HTMLElement
 * customAddEventListener(button, 'click', () => console.log('Regular button clicked!'));
 *
 * // Using with a WrappedButton
 * customAddEventListener(wrappedButton as unknown as HTMLElement, 'click', () => console.log('Wrapped button clicked!'));
 *
 * button.click(); // Logs: "Regular button clicked!"
 * wrappedButton.click(); // Logs: "Wrapped button clicked!"
 */
export const customAddEventListener: AddEventListenerType = (
  element,
  type,
  listener,
  options
) => {
  if (element instanceof WrappedButton) {
    element.addEventListener(type, listener as EventListenerOrEventListenerObject, options);
  } else {
    element.addEventListener(type, listener, options);
  }
};
