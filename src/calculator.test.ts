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

    expect(result.innerHTML).toBe("13 h, 57 min");
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
    expect(result?.innerHTML).toBe("125 h, 40 min");

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
    expect(formatMinutesToTimeString(754)).toBe("12 h, 34 min");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(83)).toBe("1 h, 23 min");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(0)).toBe("0 min");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(1439)).toBe("23 h, 59 min");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(1)).toBe("1 min");
  });

  it("Formats a number of minutes correctly", () => {
    expect(formatMinutesToTimeString(59)).toBe("59 min");
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

describe("setupAddButton with subtraction", () => {
  it("Can add and subtract times in the same calculation", () => {
    // Create and set up input elements with proper time format
    const inputs = [
      { value: "1 h, 0 min", subtract: false },  // Changed from "1 h" to "1 h, 0 min"
      { value: "30 min", subtract: true },
      { value: "15 min", subtract: false }
    ];

    // Create elements for each input
    inputs.forEach((input, index) => {
      const i = index + 1;

      const time = document.createElement("input");
      time.id = `time${i}`;
      time.type = "text";
      time.value = input.value;
      document.body.appendChild(time);

      const subtract = document.createElement("input");
      subtract.id = `subtract${i}`;
      subtract.type = "checkbox";
      subtract.checked = input.subtract;
      document.body.appendChild(subtract);
    });

    // Create remaining empty inputs with their checkboxes
    for (let i = inputs.length + 1; i <= TOTAL_INPUTS; i++) {
      const time = document.createElement("input");
      time.id = `time${i}`;
      document.body.appendChild(time);

      const subtract = document.createElement("input");
      subtract.id = `subtract${i}`;
      subtract.type = "checkbox";
      subtract.checked = false;
      document.body.appendChild(subtract);
    }

    // Add error spans
    createAndAddErrorSpans();

    const result = document.createElement("span");
    result.id = "result-value";
    document.body.appendChild(result);

    // Set up and click the button
    const button = document.createElement("button");
    button.id = "add";
    setupAddButton(button);
    button.click();

    // Expect 1h - 30min + 15min = 45min
    expect(result.innerHTML).toBe("45 min");
  });

  it("Never returns a negative result", () => {
    // Create first input (30 min)
    const time1 = document.createElement("input");
    time1.id = "time1";
    time1.type = "text";
    time1.value = "30 min";
    document.body.appendChild(time1);

    const subtract1 = document.createElement("input");
    subtract1.id = "subtract1";
    subtract1.type = "checkbox";
    subtract1.checked = false;
    document.body.appendChild(subtract1);

    // Create second input (1 hour, subtracted)
    const time2 = document.createElement("input");
    time2.id = "time2";
    time2.type = "text";
    time2.value = "1 h, 0 min"; // Changed from "1 h" to "1 h, 0 min"
    document.body.appendChild(time2);

    const subtract2 = document.createElement("input");
    subtract2.id = "subtract2";
    subtract2.type = "checkbox";
    subtract2.checked = true;
    document.body.appendChild(subtract2);

    // Create remaining empty inputs
    for (let i = 3; i <= TOTAL_INPUTS; i++) {
      const time = document.createElement("input");
      time.id = `time${i}`;
      document.body.appendChild(time);

      const subtract = document.createElement("input");
      subtract.id = `subtract${i}`;
      subtract.type = "checkbox";
      subtract.checked = false;
      document.body.appendChild(subtract);
    }

    // Add error spans
    createAndAddErrorSpans();

    const result = document.createElement("span");
    result.id = "result-value";
    document.body.appendChild(result);

    // Set up and click the button
    const button = document.createElement("button");
    button.id = "add";
    setupAddButton(button);
    button.click();

    // 30min - 1h would be -30min, but we expect 00:00
    expect(result.innerHTML).toBe("0 min");
  });
});
