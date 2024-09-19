import { test, expect } from "@playwright/test";

test("Filling in two times and hitting the add button", async ({ page }) => {
  await page.goto("/");

  // Wait for the input fields and button to be available
  const input1 = await page.waitForSelector("input#time1");
  const input2 = await page.waitForSelector("input#time2");
  const addButton = await page.waitForSelector("button#add");

  // Fill in the times
  await input1.fill("01:23");
  await input2.fill("02:23");

  // Click the add button
  await addButton.click();

  // Wait for the result span to become visible and contain text
  const resultSpan = await page.waitForSelector(
    "span#result-value:not(:empty)",
    { state: "visible" }
  );

  // Check the result
  const result = await resultSpan.textContent();
  expect(result).toBe("03:46");
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
  await input1.fill("01:23");
  await input2.fill("02:23");

  // Click the add button
  await addButton.click();

  // Wait for the result span to become visible and contain text
  const resultSpan = await page.waitForSelector("span#result-value");
  await resultSpan.waitForElementState("visible");
  const result = await resultSpan.textContent();
  expect(result).toBe("03:46");

  // Click the reset button
  const resetButton = await page.waitForSelector("button#reset");
  await resetButton.click();

  // Check that the inputs are empty
  expect(await input1.inputValue()).toBe("");
  expect(await input2.inputValue()).toBe("");

  // Check that the result is empty
  expect(await resultSpan.textContent()).toBe("");
});
