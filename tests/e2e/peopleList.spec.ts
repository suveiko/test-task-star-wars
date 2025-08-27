import { test, expect } from '@playwright/test';

test.describe('People List Page', () => {
  test('should load and display character list', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: 'Star Wars Characters' })).toBeVisible();
    
    await page.waitForSelector('[class*="Card"]', { timeout: 10_000 });
    
    const cards = page.locator('[class*="Card"]');
    await expect(cards).toHaveCount(10);
    
    const firstCard = cards.first();
    await expect(firstCard.locator('text=/Height:/')).toBeVisible();
    await expect(firstCard.locator('text=/Mass:/')).toBeVisible();
    await expect(firstCard.getByRole('button', { name: 'View Details' })).toBeVisible();
  });

  test('should handle pagination', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('[class*="Card"]');
    
    const pagination = page.locator('[class*="Pagination"]:has-text("1")').first();
    await expect(pagination).toBeVisible();
    
    await page.getByRole('button', { name: '2' }).click();
    
    await expect(page).toHaveURL('/?page=2');
    
    await page.waitForSelector('[class*="Card"]');
    
    const activePage = page.locator('[aria-current="page"]');
    await expect(activePage).toHaveText('2');
  });

  test('should search with debounce', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('[class*="Card"]');
    
    const searchInput = page.getByPlaceholder('Search characters...');
    await searchInput.fill('luke');
    
    await page.waitForTimeout(600);
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL('/?page=1&search=luke');
    
    const cards = page.locator('[class*="Card"]');
    const count = await cards.count();
    expect(count).toBeLessThan(10);
  });
});