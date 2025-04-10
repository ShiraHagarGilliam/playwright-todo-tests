const { test, expect } = require('@playwright/test');

// Test 1: Create a new todo
test('can create a new todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/'); // Open the app
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk'); // Type new todo
  await page.keyboard.press('Enter'); // Press Enter to add it
  const todoText = await page.locator('.todo-list li label').innerText(); // Get the text of the first todo
  expect(todoText).toBe('Buy milk'); // Check the text is correct
});

// Test 2: Edit a todo
test('can edit an existing todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add a todo
  await page.getByPlaceholder('What needs to be done?').fill('Original Task');
  await page.keyboard.press('Enter');

  // Double click to edit
  const todoItem = page.locator('.todo-list li').first();
  await todoItem.dblclick();

  // Change the text
  const editInput = todoItem.locator('.edit');
  await editInput.fill('Updated Task');
  await editInput.press('Enter');

  // Check updated text
  await expect(todoItem.locator('label')).toHaveText('Updated Task');
});

// Test 3: Mark a todo as complete and back to active
test('can toggle a todo as completed and then back to active', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add a todo
  await page.getByPlaceholder('What needs to be done?').fill('Finish homework');
  await page.keyboard.press('Enter');

  const todoItem = page.locator('.todo-list li');
  const checkbox = todoItem.locator('.toggle');

  // Mark as completed
  await checkbox.check();
  await expect(todoItem).toHaveClass(/completed/);

  // Mark as active again
  await checkbox.uncheck();
  await expect(todoItem).not.toHaveClass(/completed/);
});

// Test 4: Delete a todo
test('can delete a todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add a todo
  await page.getByPlaceholder('What needs to be done?').fill('Delete me');
  await page.keyboard.press('Enter');

  const todoItem = page.locator('.todo-list li');
  await todoItem.hover(); // Show the delete button

  const deleteButton = todoItem.locator('.destroy');
  await deleteButton.click(); // Click delete

  // Check that the list is empty
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});

// Test 5: Check the counter of items left
test('updates the items left counter correctly', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add 2 todos
  await page.getByPlaceholder('What needs to be done?').fill('Task 1');
  await page.keyboard.press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('Task 2');
  await page.keyboard.press('Enter');

  // Check counter shows 2
  await expect(page.locator('.todo-count')).toHaveText('2 items left');

  // Mark one as completed
  await page.locator('.todo-list li .toggle').first().check();

  // Check counter shows 1
  await expect(page.locator('.todo-count')).toHaveText('1 item left');
});
  