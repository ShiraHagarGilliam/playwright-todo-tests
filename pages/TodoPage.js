export class TodoPage {
    constructor(page) {
      this.page = page;
      this.input = page.getByPlaceholder('What needs to be done?');
      this.todos = page.locator('.todo-list li');
      this.toggleAll = page.locator('.toggle-all');
      this.clearCompletedBtn = page.getByRole('button', { name: 'Clear completed' });
    }
  
    async goto() {
      await this.page.goto('https://demo.playwright.dev/todomvc/');
    }
  
    async addTodo(text) {
      await this.input.fill(text);
      await this.page.keyboard.press('Enter');
    }
  
    // Get array of all visible todo item texts
    async getTodosText() {
      return await this.page.locator('.todo-list li label').allInnerTexts();
    }
  
    async toggleFirst() {
      await this.page.locator('.toggle').first().check();
    }
  
    async clearCompleted() {
      await this.clearCompletedBtn.click();
    }
  
    getTodoItem(index) {
      return this.page.locator('.todo-list li').nth(index);
    }
  
    getTodoItems() {
      return this.page.locator('.todo-list li');
    }
  }
  