import { describe, it, expect } from "vitest";
import {
  setupAddButton,
  setupResetButton,
  formatMinutesToTimeString,
  parseTextInputStringToMinutes,
  getErrMsg,
  setInputErrorMessage,
  getResultElement, TOTAL_INPUTS,
} from "./calculator.ts";
import {
  wrapButton, customAddEventListener
} from "./testUtils"

afterEach(() => {
  document.body.innerHTML = "";
});

function createAndAddErrorSpans() {
  for (let i = 1; i <= TOTAL_INPUTS; i++) {
    const errorSpan = document.createElement("span");
    errorSpan.id = `time-error${i}`;
    document.body.appendChild(errorSpan);
  }
}

function expectAllErrorSpansToBeEmpty() {
  for (let i = 1; i <= TOTAL_INPUTS; i++) {
    const errorSpan = document.querySelector<HTMLSpanElement>(`#time-error${i}`);
    expect(errorSpan?.innerHTML).toBe("");
  }
}

describe("setupAddButton", () => {
  it("Can add up times", () => {
    const time1 = document.createElement("input");
    time1.id = "time1";
    time1.type = "text";
    time1.value = "12 h, 34 min";

    const time2 = document.createElement("input");
    time2.id = "time2";
    time2.type = "text";
    time2.value = "1 h, 23min";

    const button = document.createElement("button");
    button.id = "add";

    const result = document.createElement("span");
    result.id = "result-value";

    document.body.appendChild(time1);
    document.body.appendChild(time2);
    document.body.appendChild(result);

    // Create the remaining inputs with empty user input
    for (let i = 3; i <= TOTAL_INPUTS; i++) {
      const time = document.createElement("input");
      time.id = `time${i}`;
      document.body.appendChild(time);
    }

    // Create and add all the error spans:
    createAndAddErrorSpans();

    setupAddButton(button);
    expect(result.innerHTML).toBe("");

    button.click();

    // Confirm that all the errors are unset:
    expectAllErrorSpansToBeEmpty();

    expect(result.innerHTML).toBe("13:57");
  });

  it("Throws an error if the error message span is not found", () => {
    const time = document.createElement("input");
    time.id = "time1";
    time.type = "text";
    time.value = "12 h, 34 min";
    document.body.appendChild(time);

    const button = document.createElement("button");
    button.id = "add";
    document.body.appendChild(button);

    const wrappedButton = wrapButton(button).toHTMLElement();
    setupAddButton(wrappedButton, customAddEventListener);

    expect(() => {
      wrappedButton.click();
    }).toThrow("Could not find error message span for input 1");
  });

  // Throws an error if an input element is not found
  it("Throws an error if an input element is not found", () => {
    const button = document.createElement("button");
    button.id = "add";
    document.body.appendChild(button);

    const wrappedButton = wrapButton(button).toHTMLElement();
    setupAddButton(wrappedButton, customAddEventListener);

    expect(() => {
      wrappedButton.click()
    }).toThrow("Could not find element with selector #time1");
  });
});

describe("setupResetButton", () => {
  it("Deletes the contents of all the inputs and the result, too", () => {
    // Create and populate TOTAL_INPUTS input elements
    for (let i = 1; i <= TOTAL_INPUTS; i++) {
      const time = document.createElement("input");
      time.id = `time${i}`;
      time.type = "text";
      time.value = "12 h, 34 min";
      document.body.appendChild(time);
    }

    // Add the result button
    const result = document.createElement("span");
    result.id = "result-value";
    document.body.appendChild(result);

    // Add error spans
    createAndAddErrorSpans();

    // Create the `add` button and click it:
    const addButton = document.createElement("button");
    addButton.id = "add";
    document.body.appendChild(addButton);

    const wrappedAddButton = wrapButton(addButton);
    setupAddButton(wrappedAddButton as unknown as HTMLButtonElement, customAddEventListener);

    addButton.click();

    // Quickly click and check the result:
    expect(result?.innerHTML).toBe("125:40");

    // Create the reset button
    const button = document.createElement("button");
    button.id = "reset";
    document.body.appendChild(button);

    // Click the reset button
    setupResetButton(button);
    button.click();

    // Check that all the input fields are empty
    for (let i = 1; i <= TOTAL_INPUTS; i++) {
      const time = document.querySelector<HTMLInputElement>(`#time${i}`);
      expect(time?.value).toBe("");
    }

    // Check that the result span is empty
    expect(result?.innerHTML).toBe("");
  });

  it("Does not throw an error when the result span is not found", () => {
    const button = document.createElement("button");
    button.id = "reset";
    setupResetButton(button);
    expect(() => {
      button.click();
    }).not.toThrow();
  });
});

describe("formatMinutesToTimeString", () => {
  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(754)).toBe("12:34");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(83)).toBe("01:23");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(0)).toBe("00:00");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(1439)).toBe("23:59");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(1)).toBe("00:01");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(59)).toBe("00:59");
  });
});

describe("parseTextInputStringToMinutes", () => {
  it("Can parse times like '30 min'", () => {
    expect(parseTextInputStringToMinutes("30 min")).toBe(30);
  });

  it("Can parse times like '45 min'", () => {
    expect(parseTextInputStringToMinutes("45 min")).toBe(45);
  });

  it("Can parse times like '1 h, 12 min'", () => {
    expect(parseTextInputStringToMinutes("1 h, 12 min")).toBe(72);
  });

  it("Can parse times like '2 h, 23 min'", () => {
    expect(parseTextInputStringToMinutes("2 h, 23 min")).toBe(143);
  });

  it("Throws an error for invalid input strings", () => {
    expect(() => {
      parseTextInputStringToMinutes("1 h, 12");
    }).toThrow("Unknown time format");
  });
});

describe("getErrMsg", () => {
  it("Returns the correct error message for an Error", () => {
    const error = new Error("This is an error");
    expect(getErrMsg(error)).toBe("This is an error");
  });

  it("Returns the correct error message for an unknown error", () => {
    const error = "This is a string";
    expect(getErrMsg(error)).toBe("Unknown error");
  });
});

describe("setInputErrorMessage", () => {
  it("Sets the error message correctly", () => {
    const errMsgSpan = document.createElement("span");
    errMsgSpan.id = "error-message";
    document.body.appendChild(errMsgSpan);

    const errMsg = "This is an error message";
    setInputErrorMessage(errMsg, errMsgSpan, 1);

    expect(errMsgSpan.innerHTML).toBe("This is an error message");
  });

  it("Works for an empty message", () => {
    const errMsgSpan = document.createElement("span");
    errMsgSpan.id = "error-message";
    document.body.appendChild(errMsgSpan);

    setInputErrorMessage("", errMsgSpan, 1);

    expect(errMsgSpan.innerHTML).toBe("");
  });

  it("Sets the left padding to 5px for a none-empty error", () => {
    const errMsgSpan = document.createElement("span");
    errMsgSpan.id = "error-message";
    document.body.appendChild(errMsgSpan);

    setInputErrorMessage("This is an error message", errMsgSpan, 1);

    expect(errMsgSpan.style.paddingLeft).toBe("5px");
  });

  it("Sets the left padding to 0px for an empty error", () => {
    const errMsgSpan = document.createElement("span");
    errMsgSpan.id = "error-message";
    document.body.appendChild(errMsgSpan);

    setInputErrorMessage("", errMsgSpan, 1);

    expect(errMsgSpan.style.paddingLeft).toBe("0px");
  });

  it("Throws an error when the error message span is not found", () => {
    expect(() => {
      setInputErrorMessage("This is an error message", null, 1);
    }).toThrow("Could not find error message span for input 1");
  });
});

describe("getResultElement", () => {
  it("Returns the result element when it is found", () => {
    const result = document.createElement("span");
    result.id = "result-value";
    document.body.appendChild(result);

    expect(getResultElement()).toBe(result);
  });

  it("Throws an error when the result element is not found", () => {
    expect(() => {
      getResultElement();
    }).toThrow("Could not find result element");
  });
});