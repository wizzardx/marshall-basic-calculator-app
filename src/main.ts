import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { setupAddButton, setupResetButton } from "./calculator.ts";

const appElement = document.querySelector<HTMLDivElement>("#app");
if (appElement) {
  // Generate HTML code containing 10 numeric input boxes
  let allTheInputs = "";
  for (let i = 1; i <= 10; i++) {
    allTheInputs += `<input id="num${i}" type="number" />`;
  }

  appElement.innerHTML = `
    <div id="calculator"
      <div id="user-inputs">
          ${allTheInputs}
          <button id="add" type="button">Add</button>
          <button id="reset" type="button">Reset</button>
      </div>
        <div id="result">
            Result: <span id="result-value"></span>
        </div>
    </div>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      <p class="read-the-docs">
        Click on the Vite and TypeScript logos to learn more
      </p>
    </div>
  `;
}

const counterElement = document.querySelector<HTMLButtonElement>("#counter");
if (counterElement) {
  setupCounter(counterElement);
}

const addButton = document.querySelector<HTMLButtonElement>("button#add");
if (addButton) {
  setupAddButton(addButton);
}

const resetButton = document.querySelector<HTMLButtonElement>("button#reset");
if (resetButton) {
  setupResetButton(resetButton);
}
