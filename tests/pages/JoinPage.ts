import { Page, Locator } from '@playwright/test';

/**
 * Page object for the player join / nickname screen.
 * Reached after a player submits a valid game PIN.
 */
export class JoinPage {
  readonly page: Page;
  readonly nicknameInput: Locator;
  readonly joinButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nicknameInput = page.getByPlaceholder(/nickname|name/i);
    this.joinButton = page.getByRole('button', { name: /join|go|enter/i });
  }

  /** Enter a nickname and join the game lobby. */
  async enterNickname(nickname: string) {
    await this.nicknameInput.fill(nickname);
    await this.joinButton.click();
  }
}
