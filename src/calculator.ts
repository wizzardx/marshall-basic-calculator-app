import { AddEventListenerType } from "./testUtils";

// An exported constant for the total number of user input controls:
export const TOTAL_INPUTS = 10;

export function getErrMsg(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "Unknown error";
  }
}

export function setInputErrorMessage(errMsg: string, errMsgSpan: HTMLSpanElement | null, i: number) {
  if (errMsgSpan) {
    errMsgSpan.textContent = errMsg;
    // If the error message is not empty, add some padding to the left to help space it a bit
    // from the input box, otherwise remove the padding.
    if (errMsg.length > 0) {
      errMsgSpan.style.paddingLeft = "5px";
    } else {
      errMsgSpan.style.paddingLeft = "0";
    }
  } else {
    throw Error(`Could not find error message span for input ${i}`);
  }
}

export function getResultElement(): HTMLSpanElement{
  const element = document.querySelector<HTMLSpanElement>("#result-value");
  if (element) {
    return element;
  } else {
    throw new Error("Could not find result element");
  }
}

const defaultAddEventListener: AddEventListenerType = (element, type, listener, options) => {
  element.addEventListener(type, listener, options);
};

export function setupAddButton(
  element: HTMLButtonElement,
  addEventListener: AddEventListenerType = defaultAddEventListener
) {
  addEventListener(element, "click", () => {
    let totalMinutes = 0;
    let foundErrors = false;

    for (let i = 1; i <= TOTAL_INPUTS; i++) {
      const inputSelector = `#time${i}`;
      const elem = document.querySelector<HTMLInputElement>(inputSelector);

      // Error out if the input control was not found
      if (!elem) {
        throw new Error(`Could not find element with selector ${inputSelector}`);
      }

      const trimmed = elem.value.trim();
      let errMsg = "";
      const errMsgSpan = document.querySelector<HTMLSpanElement>(`#time-error${i}`);

      // Error out if the error message span was not found
      if (!errMsgSpan) {
        throw new Error(`Could not find error message span for input ${i}`);
      }

      if (trimmed && trimmed.length > 0) {
        try {
          let minutes = parseTextInputStringToMinutes(trimmed);

          // Check for subtract checkbox, but don't require it
          const checkbox = document.querySelector<HTMLInputElement>(`#subtract${i}`);
          if (checkbox?.checked) {
            minutes = -minutes;
          }

          totalMinutes += minutes;
        } catch (error) {
          errMsg = getErrMsg(error);
          foundErrors = true;
        }
      }

      // Set (or clear) the displayed error message for this input
      setInputErrorMessage(errMsg, errMsgSpan, i);
    }

    const result = getResultElement();

    if (foundErrors) {
      result.textContent = "";
    } else {
      // Ensure the result is never negative
      totalMinutes = Math.max(0, totalMinutes);
      result.textContent = formatMinutesToTimeString(totalMinutes);
    }
  });
}

export function setupResetButton(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    for (let i = 1; i <= TOTAL_INPUTS; i++) {
      const time = document.querySelector<HTMLInputElement>(`#time${i}`);
      if (time) {
        time.value = "";
      }

      // Reset checkbox if it exists
      const checkbox = document.querySelector<HTMLInputElement>(`#subtract${i}`);
      if (checkbox) {
        checkbox.checked = false;
      }
    }

    const result = document.querySelector<HTMLSpanElement>("#result-value");
    if (result) {
      result.innerHTML = "";
    }
  });
}

export function formatMinutesToTimeString(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes} min`;
  } else {
    return `${hours} h, ${remainingMinutes} min`;
  }
}

export function parseTextInputStringToMinutes(inputString: string): number {
  // It can parse a time like "16 min" into 16, and a time like "1 h 12 min" into 72.

  // We don't know for sure where the spaces are, so strip all of them out.
  const strippedString = inputString.replace(/\s/g, "");

  // Check for a pattern of a number followed by "h", a comma, and another number followed by "min".
  const match = strippedString.match(/^(\d+)h,(\d+)min$/);
  if (match) {
    return parseInt(match[1]) * 60 + parseInt(match[2]);
  } else {
    // Check for a pattern of a number followed by "min".
    const match = strippedString.match(/^(\d+)min$/);
    if (match) {
      return parseInt(match[1]);
    } else {
      throw new Error('Unknown time format');
    }
  }
}
