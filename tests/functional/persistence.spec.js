import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test('todo persists after page reload', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add a new task");
  await todoPage.addTodo('Persistent Task');

  console.log("Reload the page");
  await page.reload();

  console.log("Check that the task is still visible");
  const todos = await todoPage.getTodosText();
  expect(todos).toContain('Persistent Task');
});
