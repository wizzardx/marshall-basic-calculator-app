import "./style.css";
import { setupAddButton, setupResetButton } from "./calculator.ts";

const appElement = document.querySelector<HTMLDivElement>("#app");
if (appElement) {
  // Generate HTML code containing 10 time input boxes
  let allTheInputs = "";
  for (let i = 1; i <= 10; i++) {
    allTheInputs += `<input id="time${i}" type="time" />`;
  }

  appElement.innerHTML = `
    <div id="calculator">
        Marshall's Basic Calculator App
      <div id="user-inputs">
          ${allTheInputs}
          <div id="buttons">
            <button id="add" type="button">Add</button>
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