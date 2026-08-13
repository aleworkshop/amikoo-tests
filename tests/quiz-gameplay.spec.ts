import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { HostPage } from './pages/HostPage';

/**
 * Quiz gameplay flow — verifies the host can launch a game and that
 * the question screen is rendered with answer options.
 *
 * NOTE: Full multiplayer E2E (two browser contexts) is a separate concern.
 * These tests focus on the host-side gameplay rendering.
 */
test.describe('Quiz gameplay', () => {
  test('host can start the game from the lobby', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.clickHost();

    const host = new HostPage(page);
    await host.selectFirstQuiz();

    // The Start button must be available in the lobby
    await expect(host.startButton).toBeVisible();
    await host.startGame();

    // After starting, the URL or content should move to the in-game state
    await expect(page).toHaveURL(/game|play|question/i);
  });

  test('question screen shows answer options', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.clickHost();

    const host = new HostPage(page);
    await host.selectFirstQuiz();
    await host.startGame();

    // At least one answer option (button or tile) must be rendered
    const answerOptions = page.locator(
      '[data-testid="answer"], .answer, [class*="answer"], [class*="option"]'
    );
    await expect(answerOptions.first()).toBeVisible();
  });

  test('scoreboard is shown after a question ends', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.clickHost();

    const host = new HostPage(page);
    await host.selectFirstQuiz();
    await host.startGame();

    // Advance past the question (timer or next button)
    const nextButton = page.getByRole('button', { name: /next|continue|results/i });
    // Wait for it — it may appear after a countdown
    await expect(nextButton).toBeVisible({ timeout: 30_000 });
    await nextButton.click();

    // A leaderboard / scoreboard area should appear
    const scoreboard = page.getByText(/score|leaderboard|rank|points/i);
    await expect(scoreboard).toBeVisible();
  });
});
