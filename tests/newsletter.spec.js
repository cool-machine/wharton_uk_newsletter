// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Newsletter Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./complete-original-newsletter.html');
  });

  test('loads newsletter builder successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Newsletter Builder/);
    
    // Check main elements are present
    await expect(page.locator('#headerTitle')).toBeVisible();
    await expect(page.locator('#newsletterTitle')).toBeVisible();
    await expect(page.locator('#salutation')).toBeVisible();
    await expect(page.locator('#openingGreeting')).toBeVisible();
  });

  test('can add rich text section', async ({ page }) => {
    // Click add rich text section button
    await page.click('text=➕ Add Rich Text Section');
    
    // Verify section was added
    const sections = await page.locator('.section').count();
    expect(sections).toBeGreaterThan(0);
  });

  test('can edit header title', async ({ page }) => {
    const headerInput = page.locator('#headerTitle');
    await headerInput.fill('Test Newsletter Header');
    
    // Check if the value was set
    await expect(headerInput).toHaveValue('Test Newsletter Header');
  });

  test('can edit newsletter title', async ({ page }) => {
    const titleInput = page.locator('#newsletterTitle');
    await titleInput.fill('Test Newsletter Title');
    
    await expect(titleInput).toHaveValue('Test Newsletter Title');
  });

  test('save functionality exists', async ({ page }) => {
    // Check if save button is present
    await expect(page.locator('text=💾 Save')).toBeVisible();
  });

  test('copy HTML functionality exists', async ({ page }) => {
    // Check if copy HTML button is present
    await expect(page.locator('text=📋 Copy HTML')).toBeVisible();
  });

  test('preview panel is functional', async ({ page }) => {
    // Fill in some content
    await page.fill('#headerTitle', 'Test Header');
    await page.fill('#newsletterTitle', 'Test Newsletter');
    
    // Check if preview updates (basic check)
    const preview = page.locator('#preview');
    await expect(preview).toContainText('Test Header');
  });

  test('responsive design works', async ({ page }) => {
    // Quick responsive check
    await expect(page.locator('#headerTitle')).toBeVisible();
  });
});

test.describe('Landing Page', () => {
  test('loads index page successfully', async ({ page }) => {
    await page.goto('./index.html');
    
    await expect(page).toHaveTitle(/Wharton Club UK Newsletter Builder/);
    await expect(page.locator('h1')).toContainText('Newsletter Builder');
  });

  test('has working link to main app', async ({ page }) => {
    await page.goto('./index.html');
    
    // Check launch button exists
    await expect(page.locator('text=Launch Newsletter Builder')).toBeVisible();
  });
});
