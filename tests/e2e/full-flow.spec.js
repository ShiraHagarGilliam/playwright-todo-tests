import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test('full end-to-end flow', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add 3 todos: 'Task 1', 'Task 2', 'Task 3'");
  await todoPage.addTodo('Task 1');
  await todoPage.addTodo('Task 2');
  await todoPage.addTodo('Task 3');

  console.log("Mark 'Task 2' as completed");
  await todoPage.getTodoItem(1).locator('.toggle').check();

  console.log("Edit 'Task 3' to 'Task 3 - edited'");
  const task3 = todoPage.getTodoItem(2);
  await task3.dblclick();
  await task3.locator('.edit').fill('Task 3 - edited');
  await task3.locator('.edit').press('Enter');

  console.log("Delete 'Task 1'");
  const task1 = todoPage.getTodoItem(0);
  await task1.hover();
  await task1.locator('.destroy').click();

  console.log("Check that only 2 todos remain");
  await expect(todoPage.getTodoItems()).toHaveCount(2);

  console.log("Click 'Active' filter");
  await page.getByRole('link', { name: 'Active' }).click();
  let activeItems = await todoPage.getTodoItems().allInnerTexts();
  activeItems = activeItems.map(t => t.trim());
  expect(activeItems).toEqual(['Task 3 - edited']);

  console.log("Click 'Completed' filter");
  await page.getByRole('link', { name: 'Completed' }).click();
  let completedItems = await todoPage.getTodoItems().allInnerTexts();
  completedItems = completedItems.map(t => t.trim());
  expect(completedItems).toEqual(['Task 2']);

  console.log("Clear completed todos");
  await todoPage.clearCompleted();

  console.log("Go back to 'All' filter and check remaining task");
  await page.getByRole('link', { name: 'All' }).click();
  const remaining = await todoPage.getTodosText();
  console.log("Remaining todos:", remaining);
  expect(remaining).toEqual(['Task 3 - edited']);
});
