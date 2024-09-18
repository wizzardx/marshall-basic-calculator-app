import { test, expect } from '@playwright/test';

test('homepage has Vite and TypeScript logos', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ TS/);

  // Expect the Vite logo to be visible
  await expect(page.locator('img[alt="Vite logo"]')).toBeVisible();

  // Expect the TypeScript logo to be visible
  await expect(page.locator('img[alt="TypeScript logo"]')).toBeVisible();
});

test('counter increments correctly', async ({ page }) => {
  await page.goto('/');

  const counterButton = page.locator('button#counter');

  // Check initial count
  await expect(counterButton).toHaveText('count is 0');

  // Click the button and check if count increments
  await counterButton.click();
  await expect(counterButton).toHaveText('count is 1');

  // Click again and check
  await counterButton.click();
  await expect(counterButton).toHaveText('count is 2');
});