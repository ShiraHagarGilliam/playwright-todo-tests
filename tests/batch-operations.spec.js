const { test, expect } = require('@playwright/test');

// Test 10: Mark all todos as completed
test('can mark all todos as completed', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add 2 todos
  const tasks = ['All 1', 'All 2'];
  for (const task of tasks) {
    await page.getByPlaceholder('What needs to be done?').fill(task);
    await page.keyboard.press('Enter');
  }

  // Click "Mark all as completed"
  await page.locator('.toggle-all').check();

  // Check both items have "completed" class
  const items = page.locator('.todo-list li');
  await expect(items).toHaveCount(2);
  for (let i = 0; i < 2; i++) {
    await expect(items.nth(i)).toHaveClass(/completed/);
  }
});

// Test 11: Clear completed todos
test('can clear completed todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add a todo
  await page.getByPlaceholder('What needs to be done?').fill('Temp Task');
  await page.keyboard.press('Enter');

  // Mark it as completed
  await page.locator('.toggle').check();

  // Click "Clear completed"
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Check the list is empty
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});