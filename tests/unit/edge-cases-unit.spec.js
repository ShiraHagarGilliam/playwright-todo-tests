import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test('does not add an empty todo', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Try to add without typing");
  await page.keyboard.press('Enter');

  console.log("Check that nothing was added");
  await expect(todoPage.getTodoItems()).toHaveCount(0);
});

test('can add a very long todo', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Create a long string");
  const longText = 'A'.repeat(1000);

  console.log("Add it");
  await todoPage.addTodo(longText);

  console.log("Check the long task appears correctly");
  const todos = await todoPage.getTodosText();
  expect(todos).toContain(longText);
});

test('does not add a todo with only spaces', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Fill spaces only");
  await todoPage.input.fill('   ');

  console.log("Try to add");
  await page.keyboard.press('Enter');

  console.log("Make sure nothing was added");
  await expect(todoPage.getTodoItems()).toHaveCount(0);
});

test('can add todo with special characters and emojis', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  const specialText = '!!! ??? 🤖🎉💡';

  console.log("Add a task with emojis");
  await todoPage.addTodo(specialText);

  console.log("Get all task texts");
  const todos = await todoPage.getTodosText();

  console.log("Check that it's in the list");
  expect(todos).toContain(specialText);
});
