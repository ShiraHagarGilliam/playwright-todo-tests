import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test('can mark all todos as completed', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add two tasks");
  await todoPage.addTodo('All 1');
  await todoPage.addTodo('All 2');

  console.log("Click the toggle-all checkbox");
  await todoPage.toggleAll.check();

  const items = todoPage.getTodoItems();

  console.log("Make sure both items exist");
  await expect(items).toHaveCount(2);

  console.log('Check both items have "completed" class');
  await expect(items.nth(0)).toHaveClass(/completed/);
  await expect(items.nth(1)).toHaveClass(/completed/);
});

test('can clear completed todos', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add a new task");
  await todoPage.addTodo('Temp Task');

  console.log("Mark it as completed");
  await todoPage.getTodoItem(0).locator('.toggle').check();

  console.log('Click the "Clear completed" button');
  await todoPage.clearCompleted();

  console.log("Make sure the list is empty");
  await expect(todoPage.getTodoItems()).toHaveCount(0);
});
