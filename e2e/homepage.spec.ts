import { test, expect } from "@playwright/test";

test("Filling in two times and hitting the add button", async ({ page }) => {
  await page.goto("/");

  // Wait for the input fields and button to be available
  const input1 = await page.waitForSelector("input#time1");
  const input2 = await page.waitForSelector("input#time2");
  const addButton = await page.waitForSelector("button#add");

  // Fill in the times
  await input1.fill("13 min");
  await input2.fill("24 min");

  // Click the add button
  await addButton.click();

  // Wait for the result span to become visible and contain text
  const resultSpan = await page.waitForSelector(
    "span#result-value:not(:empty)",
    { state: "visible" }
  );

  // Check the result
  const result = await resultSpan.textContent();
  expect(result).toBe("00:37");
});

test("Pressing a Reset button should clear the inputs and the result", async ({
  page,
}) => {
  await page.goto("/");

  // Wait for the input fields, button and result span to be available
  const input1 = await page.waitForSelector("input#time1");
  const input2 = await page.waitForSelector("input#time2");
  const addButton = await page.waitForSelector("button#add");

  // Fill in the times
  await input1.fill("3 min");
  await input2.fill("5 min");

  // Click the add button
  await addButton.click();

  // Wait for the result span to become visible and contain text
  const resultSpan = await page.waitForSelector("span#result-value");
  await resultSpan.waitForElementState("visible");
  const result = await resultSpan.textContent();
  expect(result).toBe("00:08");

  // Click the reset button
  const resetButton = await page.waitForSelector("button#reset");
  await resetButton.click();

  // Check that the inputs are empty
  expect(await input1.inputValue()).toBe("");
  expect(await input2.inputValue()).toBe("");

  // Check that the result is empty
  expect(await resultSpan.textContent()).toBe("");
});

test("Inputting something invalid in the 3rd row should make an error message appear next to it", async ({ page }) => {
    await page.goto("/");

    // Wait for the input fields, button and result span to be available
    const input3 = await page.waitForSelector("input#time3");
    const addButton = await page.waitForSelector("button#add");

    // Fill in the times
    await input3.fill("invalid");

    // Click the add button
    await addButton.click();

    // Wait for the error message to appear
    const errorSpan = await page.waitForSelector("span#time-error3", {
        state: "visible",
    });

    // Check the error message
    const error = await errorSpan.textContent();
    expect(error).toBe("Unknown time format");
});

test("The 'Add' button has the text 'Calculate' in it", async ({ page }) => {
    await page.goto("/");

    const addButton = await page.waitForSelector("button#add");
    const text = await addButton.textContent();
    expect(text).toBe("Calculate");
});

test("Adding up '15 min', '45 min', and '1 h 12 min' should give '2 h 12 min'", async ({ page }) => {
    await page.goto("/");

    // Wait for the input fields, button and result span to be available
    const input1 = await page.waitForSelector("input#time1");
    const input2 = await page.waitForSelector("input#time2");
    const input3 = await page.waitForSelector("input#time3");
    const addButton = await page.waitForSelector("button#add");

    // Fill in the times
    await input1.fill("15 min");
    await input2.fill("45 min");
    await input3.fill("1 h, 12 min");

    // Click the add button
    await addButton.click();

    // Wait for the result span to become visible and contain text
    const resultSpan = await page.waitForSelector("span#result-value");
    await resultSpan.waitForElementState("visible");
    const result = await resultSpan.textContent();
    expect(result).toBe("02:12");
});

test("When there is an error with input it should clear the result field", async ({ page }) => {
    await page.goto("/");

    // Wait for the input fields, button and result span to be available
    const input1 = await page.waitForSelector("input#time1");
    const addButton = await page.waitForSelector("button#add");

    // Fill in the times
    await input1.fill("invalid");

    // Click the add button
    await addButton.click();

    // Wait for the error message to appear
    const errorSpan = await page.waitForSelector("span#time-error1", {
        state: "visible",
    });

    // Check the error message
    const error = await errorSpan.textContent();
    expect(error).toBe("Unknown time format");

    // Check that the result field is empty:
    const resultSpan = await page.waitForSelector("span#result-value", {
        state: "attached",
    });

    if (!resultSpan) {
        throw new Error("Result span not found");
    }

    // Check that the result is empty
    expect(await resultSpan.textContent()).toBe("");
});
