import { Page, Locator } from '@playwright/test';

/**
 * Page object for the host quiz-selection / lobby screen.
 * After clicking "Host", the host picks a quiz and waits for players.
 */
export class HostPage {
  readonly page: Page;
  readonly quizCards: Locator;
  readonly startButton: Locator;
  readonly gamePin: Locator;

  constructor(page: Page) {
    this.page = page;
    // Quiz list shown when selecting which quiz to host
    this.quizCards = page.locator('[data-testid="quiz-card"], .quiz-card, [class*="quiz"]').first();
    // "Start" button inside the lobby once players are waiting
    this.startButton = page.getByRole('button', { name: /start/i });
    // The game PIN displayed in the lobby for players to join
    this.gamePin = page.locator('[data-testid="game-pin"], [class*="pin"], [class*="code"]').first();
  }

  /** Select the first available quiz to host. */
  async selectFirstQuiz() {
    await this.quizCards.click();
  }

  async startGame() {
    await this.startButton.click();
  }

  /** Returns the game PIN text shown in the lobby. */
  async getGamePin(): Promise<string> {
    return (await this.gamePin.textContent()) ?? '';
  }
}
