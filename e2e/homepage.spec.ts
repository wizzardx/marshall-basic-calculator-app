import { test, expect } from "@playwright/test";

test("homepage has Vite and TypeScript content", async ({ page }) => {
  await page.goto("/");

  // Wait for the content to be loaded
  await page.waitForSelector("h1");

  // Check for Vite content
  const viteContent = await page.textContent("body");
  expect(viteContent).toContain("Vite");

  // Check for TypeScript content
  expect(viteContent).toContain("TypeScript");
});

test("counter increments correctly", async ({ page }) => {
  await page.goto("/");

  // Wait for the button to be available
  const counterButton = await page.waitForSelector("button#counter");

  // Check initial count
  expect(await counterButton.textContent()).toBe("count is 0");

  // Click the button and check if count increments
  await counterButton.click();
  expect(await counterButton.textContent()).toBe("count is 1");

  // Click again and check
  await counterButton.click();
  expect(await counterButton.textContent()).toBe("count is 2");
});

test("Filling in two numbers and hitting the add button", async ({ page }) => {
  await page.goto("/");

  // Wait for the input fields and button to be available
  const input1 = await page.waitForSelector("input#num1");
  const input2 = await page.waitForSelector("input#num2");
  const addButton = await page.waitForSelector("button#add");

  // Fill in the numbers
  await input1.fill("2");
  await input2.fill("3");

  // Click the add button
  await addButton.click();

  // Wait for the result span to become visible and contain text
  const resultSpan = await page.waitForSelector(
    "span#result-value:not(:empty)",
    { state: "visible" }
  );

  // Check the result
  const result = await resultSpan.textContent();
  expect(result).toBe("5");
});

test("Pressing a Reset button should clear the inputs and the result", async ({
  page,
}) => {
  await page.goto("/");

  // Wait for the input fields, button and result span to be available
  const input1 = await page.waitForSelector("input#num1");
  const input2 = await page.waitForSelector("input#num2");
  const addButton = await page.waitForSelector("button#add");

  // Fill in the numbers
  await input1.fill("2");
  await input2.fill("3");

  // Click the add button
  await addButton.click();

  // Wait for the result span to become visible and contain text
  const resultSpan = await page.waitForSelector("span#result-value");
  await resultSpan.waitForElementState("visible");
  const result = await resultSpan.textContent();
  expect(result).toBe("5");

  // Click the reset button
  const resetButton = await page.waitForSelector("button#reset");
  await resetButton.click();

  // Check that the inputs are empty
  expect(await input1.inputValue()).toBe("");
  expect(await input2.inputValue()).toBe("");

  // Check that the result is empty
  expect(await resultSpan.textContent()).toBe("");
});
