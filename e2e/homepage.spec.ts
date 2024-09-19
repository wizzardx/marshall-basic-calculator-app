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
