import { describe, it, expect } from "vitest";
import {
  setupAddButton,
  setupResetButton,
  parseTimeStringToMinutes,
  formatMinutesToTimeString,
} from "./calculator.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("setupAddButton", () => {
  it("Does not throw an error when the result span is not found", () => {
    const button = document.createElement("button");
    button.id = "add";
    setupAddButton(button);
    expect(() => {
      button.click();
    }).not.toThrow();
  });

  it("Can add up times", () => {
    const time1 = document.createElement("input");
    time1.id = "time1";
    time1.type = "time";
    time1.value = "12:34";

    const time2 = document.createElement("input");
    time2.id = "time2";
    time2.type = "time";
    time2.value = "01:23";

    const button = document.createElement("button");
    button.id = "add";

    const result = document.createElement("span");
    result.id = "result-value";

    document.body.appendChild(time1);
    document.body.appendChild(time2);
    document.body.appendChild(result);

    setupAddButton(button);
    expect(result.innerHTML).toBe("");

    button.click();

    expect(result.innerHTML).toBe("13:57");
  });
});

describe("setupResetButton", () => {
  it("Deletes the contents of all the inputs and the result, too", () => {
    // Create and populate 10 input elements
    for (let i = 1; i <= 10; i++) {
      const time = document.createElement("input");
      time.id = `time${i}`;
      time.value = formatMinutesToTimeString(i * 5);
      document.body.appendChild(time);
    }

    // Add the result button
    const result = document.createElement("span");
    result.id = "result-value";
    document.body.appendChild(result);

    // Create the `add` button and click it:
    const addButton = document.createElement("button");
    addButton.id = "add";
    document.body.appendChild(addButton);
    setupAddButton(addButton);
    addButton.click();

    // Quickly click and check the result:
    expect(result?.innerHTML).toBe("04:35");

    // Create the reset button
    const button = document.createElement("button");
    button.id = "reset";
    document.body.appendChild(button);

    // Click the reset button
    setupResetButton(button);
    button.click();

    // Check that all the input fields are empty
    for (let i = 1; i <= 10; i++) {
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

describe("parseTimeStringToMinutes", () => {
  it("Parses a time string correctly", () => {
    expect(parseTimeStringToMinutes("12:34")).toBe(754);
  });

  it("Parses a time string correctly", () => {
    expect(parseTimeStringToMinutes("01:23")).toBe(83);
  });

  it("Parses a time string correctly", () => {
    expect(parseTimeStringToMinutes("00:00")).toBe(0);
  });

  it("Parses a time string correctly", () => {
    expect(parseTimeStringToMinutes("23:59")).toBe(1439);
  });

  it("Parses a time string correctly", () => {
    expect(parseTimeStringToMinutes("00:01")).toBe(1);
  });

  it("Parses a time string correctly", () => {
    expect(parseTimeStringToMinutes("00:59")).toBe(59);
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
