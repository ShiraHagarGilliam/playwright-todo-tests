const { test, expect } = require('@playwright/test');

// Test 1: Do not add an empty todo
test('does not add an empty todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/'); // Open the app

  await page.keyboard.press('Enter'); // Try to add a todo without typing anything

  // Check that no todo was added
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});

// Test 2: Add a very long todo
test('can add a very long todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/'); // Open the app

  const longText = 'A'.repeat(1000); // Create a very long string (1000 letters)
  await page.getByPlaceholder('What needs to be done?').fill(longText); // Type the long text
  await page.keyboard.press('Enter'); // Press Enter to add the todo

  // Check that the todo was added correctly
  const todoText = await page.locator('.todo-list li label').innerText();
  expect(todoText).toBe(longText);
});

// Test 3: Do not add a todo with only spaces
test('does not add a todo with only spaces', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/'); // Open the app

  await page.getByPlaceholder('What needs to be done?').fill('   '); // Type spaces only
  await page.keyboard.press('Enter'); // Press Enter

  // Check that nothing was added
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});

// Test 4: Add todo with special characters and emojis
test('can add todo with special characters and emojis', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/'); // Open the app

  const specialText = '!!! ??? 🤖🎉💡'; // Special characters and emojis
  await page.getByPlaceholder('What needs to be done?').fill(specialText); // Type the text
  await page.keyboard.press('Enter'); // Press Enter

  // Check that the todo was added with correct text
  const todoText = await page.locator('.todo-list li label').innerText();
  expect(todoText).toBe(specialText);
});

// Test 5: Prevent duplicate on double Enter
test('double enter does not add duplicate todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/'); // Open the app

  await page.getByPlaceholder('What needs to be done?').fill('One Task'); // Type a todo
  await page.keyboard.press('Enter'); // First Enter - adds the todo
  await page.keyboard.press('Enter'); // Second Enter - should not add another one

  // Check that there is only one todo
  await expect(page.locator('.todo-list li')).toHaveCount(1);
});

// Test 6: Editing a todo to empty text should remove it
test('editing a todo to empty text should remove it', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/'); // Open the app

  await page.getByPlaceholder('What needs to be done?').fill('To be cleared'); // Add a todo
  await page.keyboard.press('Enter');

  const todoItem = page.locator('.todo-list li').first(); // Get the first todo

  await todoItem.dblclick(); // Double click to start editing
  const editInput = todoItem.locator('.edit');
  await editInput.fill(''); // Clear the text
  await editInput.press('Enter'); // Press Enter

  // Check that the todo was removed
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});