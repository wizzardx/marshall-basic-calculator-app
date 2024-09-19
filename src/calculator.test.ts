import { describe, it, expect } from "vitest";
import { setupAddButton, setupResetButton } from "./calculator.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("setupAddButton", () => {
  it("Can calculate 2 + 3", () => {
    const num1 = document.createElement("input");
    num1.id = "num1";

    const num2 = document.createElement("input");
    num2.id = "num2";

    const button = document.createElement("button");
    button.id = "add";

    const result = document.createElement("span");
    result.id = "result-value";

    document.body.appendChild(num1);
    document.body.appendChild(num2);
    document.body.appendChild(result);

    setupAddButton(button);
    expect(result.innerHTML).toBe("");

    num1.value = "2";
    num2.value = "3";
    button.click();

    expect(result.innerHTML).toBe("5");
  });

  it("Can calculate 5 + 6 + 7", () => {
    const num1 = document.createElement("input");
    num1.id = "num1";

    const num2 = document.createElement("input");
    num2.id = "num2";

    const num3 = document.createElement("input");
    num3.id = "num3";

    const button = document.createElement("button");
    button.id = "add";

    const result = document.createElement("span");
    result.id = "result-value";

    document.body.appendChild(num1);
    document.body.appendChild(num2);
    document.body.appendChild(num3);
    document.body.appendChild(result);

    setupAddButton(button);
    expect(result.innerHTML).toBe("");

    num1.value = "5";
    num2.value = "6";
    num3.value = "7";
    button.click();

    expect(result.innerHTML).toBe("18");
  });

  it("Does not throw an error when the result span is not found", () => {
    const button = document.createElement("button");
    button.id = "add";
    setupAddButton(button);
    expect(() => {
      button.click();
    }).not.toThrow();
  });
});

describe("setupResetButton", () => {
  it("Deletes the contents of all the inputs and the result, too", () => {
    // Create and populate 10 input elements
    for (let i = 1; i <= 10; i++) {
      const num = document.createElement("input");
      num.id = `num${i}`;
      num.value = i.toString();
      document.body.appendChild(num);
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
    expect(result?.innerHTML).toBe("55");

    // Create the reset button
    const button = document.createElement("button");
    button.id = "reset";
    document.body.appendChild(button);

    // Click the reset button
    setupResetButton(button);
    button.click();

    // Check that all the input fields are empty
    for (let i = 1; i <= 10; i++) {
      const num = document.querySelector<HTMLInputElement>(`#num${i}`);
      expect(num?.value).toBe("");
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
