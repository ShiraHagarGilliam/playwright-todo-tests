# playwright-todo-tests ✅

This project is a test automation suite for the [TodoMVC App](https://demo.playwright.dev/todomvc/), built using [Playwright](https://playwright.dev/).

It was created as part of the home assignment for the Shift Security CO-OP program.

---

## 📦 Project Setup

To install the project and run the tests, use these commands:

```bash
npm install
npx playwright install
```

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

The tests are organized in 5 different files, each with its own focus:

| File Name | What it Tests |
|-----------|----------------|
| `todo-management.spec.js` | Add, edit, delete, complete a task |
| `filtering.spec.js` | Filter tasks (All, Active, Completed) |
| `batch-operations.spec.js` | Mark all complete, clear completed |
| `persistence.spec.js` | Make sure tasks stay after refresh |
| `edge-cases.spec.js` | Special cases like empty input, long text, emojis, etc. |

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

At first, I didn't know how to:
- Use filters correctly (All, Active, Completed)
- Check task text inside lists
- Handle edge cases like double Enter or empty edits

I solved these problems by learning slowly and testing step by step.  
I also used Playwright documentation to understand the best way to write reliable tests.

---

## 📈 Extra Features (Bonus)

You can run this command to open a detailed test report:

```bash
npx playwright show-report
```

This opens a full HTML report in your browser with all test results.

---

## 🙋‍♀️ Created by

**Shira Hagar Gilliam**  
GitHub: [ShiraHagarGilliam](https://github.com/ShiraHagarGilliam)
