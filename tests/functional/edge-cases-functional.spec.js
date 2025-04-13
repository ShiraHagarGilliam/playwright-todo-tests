import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test('double enter does not add duplicate todos', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add a task");
  await todoPage.addTodo('One Task');

  console.log("Press Enter again");
  await page.keyboard.press('Enter');

  console.log("Make sure only one task was added");
  await expect(todoPage.getTodoItems()).toHaveCount(1);
});

test('editing a todo to empty text should remove it', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  console.log("Add a task");
  await todoPage.addTodo('To be cleared');

  console.log("Get the first task");
  const todoItem = todoPage.getTodoItem(0);

  console.log("Start editing");
  await todoItem.dblclick();

  const editInput = todoItem.locator('.edit');

  console.log("Clear the text");
  await editInput.fill('');

  console.log("Press Enter to save");
  await editInput.press('Enter');

  console.log("Make sure the task was removed");
  await expect(todoPage.getTodoItems()).toHaveCount(0);
});
