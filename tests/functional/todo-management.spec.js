import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test('can create a new todo', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add a new task");
  await todoPage.addTodo('Buy milk');

  console.log("Get all task texts");
  const todos = await todoPage.getTodosText();

  console.log('Check that "Buy milk" is in the list');
  expect(todos).toContain('Buy milk');
});

test('can edit an existing todo', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add a new task");
  await todoPage.addTodo('Original Task');

  console.log("Select the first task");
  const firstTodo = todoPage.getTodoItem(0);

  console.log("Double-click to edit");
  await firstTodo.dblclick();

  const editInput = firstTodo.locator('.edit');

  console.log("Change the text");
  await editInput.fill('Updated Task');

  console.log("Save");
  await editInput.press('Enter');

  console.log("Check updated text");
  await expect(firstTodo.locator('label')).toHaveText('Updated Task');
});

test('can toggle a todo as completed and then back to active', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add a new task");
  await todoPage.addTodo('Finish homework');

  const firstTodo = todoPage.getTodoItem(0);
  const checkbox = firstTodo.locator('.toggle');

  console.log("Mark as completed");
  await checkbox.check();
  await expect(firstTodo).toHaveClass(/completed/);

  console.log("Mark as active again");
  await checkbox.uncheck();
  await expect(firstTodo).not.toHaveClass(/completed/);
});

test('can delete a todo', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add a new task");
  await todoPage.addTodo('Delete me');

  const todoItem = todoPage.getTodoItem(0);

  console.log("Show the delete button");
  await todoItem.hover();

  const deleteButton = todoItem.locator('.destroy');

  console.log("Click delete");
  await deleteButton.click();

  console.log("Check that the list is empty");
  await expect(todoPage.getTodoItems()).toHaveCount(0);
});

test('updates the items left counter correctly', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add task 1");
  await todoPage.addTodo('Task 1');

  console.log("Add task 2");
  await todoPage.addTodo('Task 2');

  console.log('Check the counter says "2 items left"');
  await expect(todoPage.page.locator('.todo-count')).toHaveText('2 items left');

  console.log("Complete one task");
  await todoPage.getTodoItem(0).locator('.toggle').check();

  console.log('Check the counter updates to "1 item left"');
  await expect(todoPage.page.locator('.todo-count')).toHaveText('1 item left');
});
