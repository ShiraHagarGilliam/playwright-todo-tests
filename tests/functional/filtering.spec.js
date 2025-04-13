import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test('filter "All" shows all todos', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  const tasks = ['Task A', 'Task B', 'Task C'];

  console.log("Add 3 tasks");
  for (const task of tasks) {
    await todoPage.addTodo(task);
  }

  console.log("Complete one of them");
  await todoPage.getTodoItem(1).locator('.toggle').check();

  console.log('Click "All" filter');
  await page.getByRole('link', { name: 'All' }).click();

  console.log("Expect all 3 tasks to be visible");
  await expect(todoPage.getTodoItems()).toHaveCount(3);
});

test('filter "Active" shows only uncompleted todos', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add 2 tasks");
  await todoPage.addTodo('To Do 1');
  await todoPage.addTodo('To Do 2');

  console.log("Complete the first one");
  await todoPage.getTodoItem(0).locator('.toggle').check();

  console.log('Click "Active" filter');
  await page.getByRole('link', { name: 'Active' }).click();

  console.log("Only one task should be shown");
  const visibleItems = todoPage.getTodoItems();
  await expect(visibleItems).toHaveCount(1);
  await expect(visibleItems.first().locator('label')).toHaveText('To Do 2');
});

test('filter "Completed" shows only completed todos', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add 2 tasks");
  await todoPage.addTodo('Done 1');
  await todoPage.addTodo('Done 2');

  console.log("Complete the second one");
  await todoPage.getTodoItem(1).locator('.toggle').check();

  console.log('Click "Completed" filter');
  await page.getByRole('link', { name: 'Completed' }).click();

  const visibleItems = todoPage.getTodoItems();

  console.log("Only one task should be visible");
  await expect(visibleItems).toHaveCount(1);
  await expect(visibleItems.first().locator('label')).toHaveText('Done 2');
});

test('filters show correct todos', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add 3 todos");
  const tasks = ['Task 1', 'Task 2', 'Task 3'];
  for (const task of tasks) {
    await todoPage.addTodo(task);
  }

  console.log("Complete Task 2");
  await todoPage.getTodoItem(1).locator('.toggle').check();

  console.log('"All" filter - expect all 3');
  await page.getByRole('link', { name: 'All' }).click();
  let allItems = await todoPage.getTodoItems().allInnerTexts();
  allItems = allItems.map(item => item.trim());
  expect(allItems).toEqual(['Task 1', 'Task 2', 'Task 3']);

  console.log('"Active" filter - expect Task 1 and 3');
  await page.getByRole('link', { name: 'Active' }).click();
  let activeItems = await todoPage.getTodoItems().allInnerTexts();
  activeItems = activeItems.map(item => item.trim());
  expect(activeItems).toEqual(['Task 1', 'Task 3']);

  console.log('"Completed" filter - expect Task 2');
  await page.getByRole('link', { name: 'Completed' }).click();
  let completedItems = await todoPage.getTodoItems().allInnerTexts();
  completedItems = completedItems.map(item => item.trim());
  expect(completedItems).toEqual(['Task 2']);
});
