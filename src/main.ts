import "./style.css";
import { setupAddButton, setupResetButton, TOTAL_INPUTS } from "./calculator.ts";

const appElement = document.querySelector<HTMLDivElement>("#app");
if (appElement) {
  // Generate HTML code containing TOTAL_INPUTS time input boxes with subtract checkboxes
  let allTheInputs = "";
  for (let i = 1; i <= TOTAL_INPUTS; i++) {
    allTheInputs += `
      <div class="input-and-error">
        <div class="input-row">
          <input id="time${i}" type="text" />
          <label class="subtract-control">
            <input type="checkbox" id="subtract${i}" />
            <span>Subtract</span>
          </label>
        </div>
        <span id="time-error${i}" class="error-message"><strong></strong></span>
      </div>
    `;
  }

  appElement.innerHTML = `
    <div id="calculator">
      Marshall's Basic Calculator App
      <div id="user-inputs">
        ${allTheInputs}
        <div id="buttons">
          <button id="add" type="button">Calculate</button>
          <button id="reset" type="button">Reset</button>
        </div>
      </div>
      <div id="result">
        Result: &nbsp;<span id="result-value"></span>
      </div>
    </div>
  `;
}

const addButton = document.querySelector<HTMLButtonElement>("button#add");
if (addButton) {
  setupAddButton(addButton);
}

const resetButton = document.querySelector<HTMLButtonElement>("button#reset");
if (resetButton) {
  setupResetButton(resetButton);
}
