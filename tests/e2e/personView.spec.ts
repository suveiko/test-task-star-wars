import { test, expect } from '@playwright/test';

test.describe('Person View Page', () => {
  test('should edit and save person locally', async ({ page }) => {
    await page.goto('/people/1');

    await page.waitForSelector('text=/Character Information/');

    const nameInput = page.getByLabel('Name');
    const originalName = await nameInput.inputValue();

    await nameInput.clear();
    await nameInput.fill('Modified Name');

    const saveButton = page.getByRole('button', { name: 'Save Locally' });
    await saveButton.click();

    await expect(page.locator('text=/Has local edits/')).toBeVisible();

    await page.reload();
    await page.waitForSelector('text=/Character Information/');

    const nameAfterReload = await page.getByLabel('Name').inputValue();
    expect(nameAfterReload).toBe('Modified Name');

    const resetButton = page.getByRole('button', { name: 'Reset Changes' });
    await resetButton.click();

    await page.waitForTimeout(100);

    const nameAfterReset = await page.getByLabel('Name').inputValue();
    expect(nameAfterReset).toBe(originalName);
  });

  test('should navigate back to list', async ({ page }) => {
    await page.goto('/people/1');

    await page.waitForSelector('text=/Character Information/');

    const backButton = page.getByRole('button', { name: 'Back to list' });
    await backButton.click();

    await expect(
      page.getByRole('heading', { name: 'Star Wars Characters' }),
    ).toBeVisible();
    await expect(page).toHaveURL('/');
  });
});
