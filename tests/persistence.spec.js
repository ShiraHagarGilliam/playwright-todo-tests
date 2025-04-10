const { test, expect } = require('@playwright/test');

// Test 12: Todos stay after reload
test('todo persists after page reload', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add a todo
  await page.getByPlaceholder('What needs to be done?').fill('Persistent Task');
  await page.keyboard.press('Enter');

  // Reload the page
  await page.reload();

  // Check that the todo is still there
  const todoText = await page.locator('.todo-list li label').innerText();
  expect(todoText).toBe('Persistent Task');
});
