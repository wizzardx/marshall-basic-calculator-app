import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.GITHUB_ACTIONS
  ? 'https://wizzardx.github.io/marshall-basic-calculator-app'
  : 'http://localhost:4173';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'dot' : 'html',
  use: {
    baseURL: baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: process.env.GITHUB_ACTIONS ? undefined : {
    command: 'pnpm run build && pnpm run preview',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
});