import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupAddButton, setupResetButton } from "./calculator.ts";

const appElement = document.querySelector<HTMLDivElement>("#app");
if (appElement) {
  // Generate HTML code containing 10 numeric input boxes
  let allTheInputs = "";
  for (let i = 1; i <= 10; i++) {
    allTheInputs += `<input id="num${i}" type="number" />`;
  }

  appElement.innerHTML = `
    <div id="calculator">
        Marshall's Basic Calculator App
      <div id="user-inputs">
          ${allTheInputs}
          <button id="add" type="button">Add</button>
          <button id="reset" type="button">Reset</button>
      </div>
      <div id="result">
          Result: <span id="result-value"></span>
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
