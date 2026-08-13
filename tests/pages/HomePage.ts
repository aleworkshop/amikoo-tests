import { Page, Locator } from '@playwright/test';

/**
 * Page object for the Kahoot Lite landing / home page.
 * Exposes actions to start hosting a game or joining one.
 */
export class HomePage {
  readonly page: Page;
  readonly hostButton: Locator;
  readonly joinButton: Locator;
  readonly gameCodeInput: Locator;
  readonly joinSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hostButton = page.getByRole('button', { name: /host/i });
    this.joinButton = page.getByRole('button', { name: /join/i });
    this.gameCodeInput = page.getByPlaceholder(/game pin|code/i);
    this.joinSubmitButton = page.getByRole('button', { name: /enter|go|join/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickHost() {
    await this.hostButton.click();
  }

  /** Enter a game PIN and proceed to the join/nickname screen. */
  async joinGame(pin: string) {
    await this.gameCodeInput.fill(pin);
    await this.joinSubmitButton.click();
  }
}
