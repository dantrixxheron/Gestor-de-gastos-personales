# meAhorro
You can find the Spanish version of this README. 🌎
## Main Page
### Features and Components
This is a simple home screen for the "meAhorro" app, where users can get a quick overview of their financial situation. Here is a description of each section:

#### Income Card
- Displays the total income registered by the user.
- Tapping the card navigates to a page where the user can view and add income details.

#### Expense Card
- Shows the total expenses.
- Tapping the card leads to a page where the user can manage expenses.

#### Balance Card
- Displays the current balance, representing the available money.

![image](https://github.com/user-attachments/assets/bdf5210b-96ae-439d-bac3-59e2cdc21153)

---

## Expenses Page

### Add Expense:
- Users can enter the expense amount, choose a category (e.g., "Food" or "Transport"), select the date, and optionally add notes.
- Pressing the "Add Expense" button saves the entry and displays it in the list below.
- Expenses are stored in the browser’s local storage, so they persist after closing and reopening the app.

### View Expense List:
- Below the form, a list of all recorded expenses is shown.
- Each item includes the amount, category, date, and any added notes.

### Edit/Delete Expense:
- Each expense has an "Edit" button that fills the form with that expense’s data.
- There's also a "Delete" button to remove the item from the list and storage.

![image](https://github.com/user-attachments/assets/4e8ac3cc-3c39-482c-8782-0e1f5226eacb)


---

## Income Page

### Add Income Form:
- **Income Amount:** A numeric field for entering the received amount.
- **Income Source:** A dropdown to classify the income (e.g., "Salary", "Freelance", or "Others").
- **Income Date:** A date selector for when the income was received.
- **Add Income Button:** Saves the record in the list and resets the form.

### Registered Income List:
- Displays all recorded incomes, showing amount, source, and date.
- Options for each income:
  - **Delete:** Remove an income from the list.
  - **Edit:** Update an existing record.
  
![image](https://github.com/user-attachments/assets/d15f4b96-ba42-405d-8125-385a0355609c)

---

## Budgets Page

### Add Budget Form:
- **Budget Category:** A field for entering the name (e.g., "Food", "Entertainment").
- **Assigned Amount:** Numeric field to set a financial limit per category.

### Budgets List:
- Shows all created budgets with category and amount.
- Options:
  - **Delete:** Remove a budget.
  - **Edit:** Modify budget details.
  
![image](https://github.com/user-attachments/assets/5b865c71-ea58-4edf-9151-9eed2ab293e0)

---

## Reports Page

### Reports Section:
This section provides visual analysis and a summary of financial data:

- **Expenses by Category:** Pie chart showing distribution by categories.
- **Monthly Expenses:** Bar/line chart showing monthly expense trends.
- **Income vs. Expenses:** Comparison chart to evaluate financial balance.

![image](https://github.com/user-attachments/assets/3d79f393-314c-41bd-b5cb-3c015c790986)
![image](https://github.com/user-attachments/assets/851b09b6-7b8d-4ed5-8a3c-71ce54a7ed12)

---

## Settings Page

### Customize Categories
- Users can add new expense categories.
  
![image](https://github.com/user-attachments/assets/4eb38807-92a5-445c-a32b-a5dbd241cd0a)


### Notifications
- Toggle options:
  - **Expense Alerts:** To monitor spending.
  - **Budget Reminders:** To help maintain budget discipline.

### Language and Currency
- Users can choose the app’s language (e.g., Spanish or English).
- Select preferred currency (USD, EUR, MXN).
  
![image](https://github.com/user-attachments/assets/35f9dab0-b7ab-4b94-910c-4af10a5d7c6c)


---

## Installation Steps

1. Install Node.js (recommended version: 20.18.0).
2. Install Ionic CLI: `npm install -g @ionic/cli`
3. Install Angular CLI: `npm install -g @angular/cli`
4. Clone the repository: `git clone https://github.com/vmartinez16/Gestor-de-gastos-personales`
5. Navigate to the project folder.
6. Install dependencies: `npm install`
7. Sync the project: `ionic capacitor sync`
8. Open with Android Studio or Xcode:
   - Android: `ionic cap open android`
   - iOS: `ionic cap open ios`
9. Run the app. Done!
