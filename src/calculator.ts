export function setupAddButton(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    let totalMinutes = 0;
    for (let i = 1; i <= 10; i++) {
      const timeString = document.querySelector<HTMLInputElement>(`#time${i}`);
      if (timeString?.value) {
        totalMinutes += parseTimeStringToMinutes(timeString.value);
      }
    }
    const result = document.querySelector<HTMLSpanElement>("#result-value");
    if (!result) return;
    result.innerHTML = formatMinutesToTimeString(totalMinutes);
  });
}

export function setupResetButton(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    for (let i = 1; i <= 10; i++) {
      const time = document.querySelector<HTMLInputElement>(`#time${i}`);
      if (time) {
        time.value = "";
      }
    }
    const result = document.querySelector<HTMLSpanElement>("#result-value");
    if (result) {
      result.innerHTML = "";
    }
  });
}

export function parseTimeStringToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatMinutesToTimeString(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(
    2,
    "0"
  )}`;
}
