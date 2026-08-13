import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { HostPage } from './pages/HostPage';

/**
 * Host game flow — verifies a host can navigate from the home page,
 * select a quiz, and land in the lobby with a game PIN ready to share.
 */
test.describe('Host a game', () => {
  test('navigates to the host quiz-selection screen', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Click Host to enter the hosting flow
    await home.clickHost();

    // After clicking Host, the URL or content should reflect the hosting context
    await expect(page).toHaveURL(/host|quiz|game/i);
  });

  test('displays at least one quiz to host', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.clickHost();

    const host = new HostPage(page);
    // At least one quiz card must be available for the host to pick
    await expect(host.quizCards).toBeVisible();
  });

  test('shows a game PIN in the lobby after selecting a quiz', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.clickHost();

    const host = new HostPage(page);
    await host.selectFirstQuiz();

    // A game PIN must appear so players can join
    await expect(host.gamePin).toBeVisible();
    const pin = await host.getGamePin();
    expect(pin.trim().length).toBeGreaterThan(0);
  });
});
