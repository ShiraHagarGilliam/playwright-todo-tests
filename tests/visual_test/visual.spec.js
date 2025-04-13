import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test('visual elements are present and behave correctly', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Check that the title 'todos' is visible");
  await expect(page.locator('h1')).toHaveText('todos');

  console.log("Check that input field is visible and has correct placeholder");
  await expect(todoPage.input).toBeVisible();
  await expect(todoPage.input).toHaveAttribute('placeholder', 'What needs to be done?');

  console.log("Check that footer is hidden before adding todos");
  await expect(page.locator('.footer')).toBeHidden();

  console.log("Check that clear completed button is hidden before any completed todos");
  await expect(todoPage.clearCompletedBtn).toBeHidden();

  console.log("Add a todo so additional UI elements become visible");
  await todoPage.addTodo('Visual check');

  console.log("Check that footer is now visible");
  await expect(page.locator('.footer')).toBeVisible();

  console.log("Check that filters (All / Active / Completed) are visible");
  await expect(page.getByRole('link', { name: 'All' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Active' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeVisible();

  console.log("Check that the counter shows 1 item left");
  await expect(page.locator('.todo-count')).toContainText('1 item left');

  console.log("Check that 'Clear completed' button is still hidden (no completed todos)");
  await expect(todoPage.clearCompletedBtn).toBeHidden();
});
