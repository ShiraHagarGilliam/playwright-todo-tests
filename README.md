# playwright-todo-tests ✅

This project is a full Playwright-based automation suite for the [TodoMVC App](https://demo.playwright.dev/todomvc/).  
It includes end-to-end, functional, and unit tests, all structured using the **Page Object Model (POM)**.

The project was built from scratch as part of the Shift Security CO-OP home assignment.

---

## 📦 Project Setup

To install the project and run the tests, use these commands:

```bash
npm install
npx playwright install

---

## ▶️ How to Run the Tests

To run all tests:

```bash
npx playwright test
```

To see the test report in your browser:

```bash
npx playwright show-report
```

---

## 🗂 Test Organization

The tests are organized by type:

| Folder              | What it Contains                                               |
|---------------------|----------------------------------------------------------------|
| `tests/unit`        | Basic edge case validation (empty inputs, long strings, etc.) |
| `tests/functional`  | Core app functionality like add/edit/delete/filter            |
| `tests/e2e`         | End-to-end flows and persistence checks                        |
| `pages/TodoPage.js` | Page Object Model (POM) abstraction for todos                 |

---

## ⚠️ Edge Cases Covered

- Not allowing adding empty todo
- Not allowing adding todo with only spaces
- Adding very long todo
- Adding todo with emojis and symbols
- Pressing Enter twice does not create duplicate todo item
- Deleting todo item when edited to contain only empty text

---

## 💬 Challenges Faced

I didn’t have much background in testing, and I had never used Playwright before.
I had to learn everything from scratch — how to write tests, organize them, and use the Page Object Model.

Understanding the differences between unit, functional, and end-to-end tests was also a challenge, but I figured it out by reading documentation and trying things step by step.

---

## 📈 Extra Features (Bonus)

✅ **Visual testing** – checking visibility of UI elements when the page loads (like input field, toggle-all checkbox, and filters)  
✅ **Cross-browser testing** – tests run on Chromium, Firefox, and WebKit using Playwright’s built-in support
✅ **CI setup with GitHub Actions** – tests run automatically on every push to the main branch  
✅ **HTML test reporting** – view results in the browser with:

```bash
npx playwright show-report
```

---

## 🙋‍♀️ Created by

**Shira Hagar Gilliam**  
GitHub: [ShiraHagarGilliam](https://github.com/ShiraHagarGilliam)
