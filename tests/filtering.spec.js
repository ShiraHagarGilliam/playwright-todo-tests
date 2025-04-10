const { test, expect } = require('@playwright/test');

// Test 6: "All" filter shows all todos
test('filter "All" shows all todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add 3 todos
  const tasks = ['Task A', 'Task B', 'Task C'];
  for (const task of tasks) {
    await page.getByPlaceholder('What needs to be done?').fill(task);
    await page.keyboard.press('Enter');
  }

  // Mark one as completed
  await page.locator('.todo-list li .toggle').nth(1).check();

  // Click on "All" filter
  await page.getByRole('link', { name: 'All' }).click();

  // Check that all 3 appear
  await expect(page.locator('.todo-list li')).toHaveCount(3);
});

// Test 7: "Active" filter shows only active todos
test('filter "Active" shows only uncompleted todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add 2 todos and complete one
  await page.getByPlaceholder('What needs to be done?').fill('To Do 1');
  await page.keyboard.press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('To Do 2');
  await page.keyboard.press('Enter');
  await page.locator('.todo-list li .toggle').nth(0).check();

  // Click on "Active"
  await page.getByRole('link', { name: 'Active' }).click();

  // Only one item should be shown
  const visibleItems = page.locator('.todo-list li');
  await expect(visibleItems).toHaveCount(1);
  await expect(visibleItems.first().locator('label')).toHaveText('To Do 2');
});

// Test 8: "Completed" filter shows only completed todos
test('filter "Completed" shows only completed todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add 2 todos and complete one
  await page.getByPlaceholder('What needs to be done?').fill('Done 1');
  await page.keyboard.press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('Done 2');
  await page.keyboard.press('Enter');
  await page.locator('.todo-list li .toggle').nth(1).check();

  // Click on "Completed"
  await page.getByRole('link', { name: 'Completed' }).click();

  const visibleItems = page.locator('.todo-list li');
  await expect(visibleItems).toHaveCount(1);
  await expect(visibleItems.first().locator('label')).toHaveText('Done 2');
});

// Test 9: Filters show correct todos in each view
test('filters show correct todos', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
  
    // Add 3 todos
    await page.getByPlaceholder('What needs to be done?').fill('Task 1');
    await page.keyboard.press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Task 2');
    await page.keyboard.press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Task 3');
    await page.keyboard.press('Enter');
  
    // Complete Task 2
    await page.locator('.todo-list li .toggle').nth(1).check();
  
    // Click "All" filter and check all todos are visible
    await page.getByRole('link', { name: 'All' }).click();
    const allItems = await page.locator('.todo-list li label').allInnerTexts();
    expect(allItems).toEqual(['Task 1', 'Task 2', 'Task 3']);
  
    // Click "Active" filter and check only active todos
    await page.getByRole('link', { name: 'Active' }).click();
    const activeItems = await page.locator('.todo-list li label').allInnerTexts();
    expect(activeItems).toEqual(['Task 1', 'Task 3']);
  
    // Click "Completed" filter and check only completed todos
    await page.getByRole('link', { name: 'Completed' }).click();
    const completedItems = await page.locator('.todo-list li label').allInnerTexts();
    expect(completedItems).toEqual(['Task 2']);
  });  
