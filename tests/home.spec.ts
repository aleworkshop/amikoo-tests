import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

/**
 * Home page smoke tests — verifies the landing page loads correctly
 * and exposes the primary entry points (Host and Join).
 */
test.describe('Home page', () => {
  test('loads and displays the main CTA buttons', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // The page title should be meaningful
    await expect(page).toHaveTitle(/.+/);

    // Both primary actions must be visible
    await expect(home.hostButton).toBeVisible();
    await expect(home.joinButton).toBeVisible();
  });

  test('shows game PIN input when joining', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // The PIN / game code input must be present for players to enter a code
    await expect(home.gameCodeInput).toBeVisible();
  });
});
