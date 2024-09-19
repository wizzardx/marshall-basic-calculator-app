export function setupAddButton(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    let sum = 0;
    for (let i = 1; i <= 10; i++) {
      const num = document.querySelector<HTMLInputElement>(`#num${i}`);
      if (num?.value) {
        sum += parseInt(num.value);
      }
    }
    const result = document.querySelector<HTMLSpanElement>("#result-value");
    if (!result) return;
    result.innerHTML = sum.toString();
  });
}

export function setupResetButton(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    for (let i = 1; i <= 10; i++) {
      const num = document.querySelector<HTMLInputElement>(`#num${i}`);
      if (num) {
        num.value = "";
      }
    }
    const result = document.querySelector<HTMLSpanElement>("#result-value");
    if (result) {
      result.innerHTML = "";
    }
  });
}
