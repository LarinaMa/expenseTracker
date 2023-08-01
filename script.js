const expenseForm = document.getElementById("expense-form");
const itemInput = document.getElementById("item-input");
const costInput = document.getElementById("cost-input");
const expenseList = document.getElementById("expense-list");
// Create an emptyarray for our expenses
let expenses = [
  {
    id: 1,
    date: "May 2, 2023",
    item: "groceries",
    cost: 100,
  },
  {
    id: 2,
    date: "Jun 18, 2023",
    item: "gas",
    cost: 40,
  },
  {
    id: 3,
    date: "Jun 22, 2023",
    item: "coffee",
    cost: 5,
  },
  {
    id: 4,
    date: "Jul 3, 2023",
    item: "lunch",
    cost: 15,
  },
];
let editmode = false;
function populateListItem(li, expense) {
  if (editmode) {
    li.innerHTML = `
    <span class="date">${expense.date}</span>
   <input class="item-input" type = "text" value="${expense.item}"/>
    <span class="cost">$${expense.cost.toFixed(2)}</span>
    <button type ="button" onclick="cancelEdit(this.parentElement,${
      expense.id
    })">
    <i class="fa fa-cancel"></i>
    </button>
    <button type="button" onclick="saveExpense(this.parentElement,${
      expense.id
    })">
    <i class="fa fa-check"></i>
    </button>
    `;
  } else {
    li.innerHTML = `
  <span class="date">${expense.date}</span>
  <span class="item">${expense.item}</span>
  <span class="cost">$${expense.cost.toFixed(2)}</span>
  <button type ="button" onclick="deleteExpenses(${expense.id})">
  <i class="fa fa-trash"></i>
  </button>
  <button type="button" onclick = "editExpense(this.parentElement, ${
    expense.id
  })"<i class="fa fa-pencil"></i>
  </button>
  `;
  }
}

// All functions should be AFTER the expenses array, but BEFORE the submit function.
function createListItem(expense) {
  const li = document.createElement("li");
  populateListItem(li, expense);
  expenseList.appendChild(li);
}
function displayAllExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((expense) => createListItem(expense));
}
window.onload = function () {
  displayAllExpenses();
};
// Delete Expense
function deleteExpenses(expenseID) {
  expenses = expenses.filter((expense) => expense.id !== expenseID);
  console.log(expenses);
  displayAllExpenses();
}
// Edit Expense
function editExpense(li, expenseID) {
  editmode = true;
  const updatedExpense = expenses.find((expense) => expense.id === expenseID);
  populateListItem(li, updatedExpense);
}
// Cancel Edit
function cancelEdit(li, expenseID) {
  editmode = false;
  const updatedExpense = expenses.find((expense) => expense.id === expenseID);
  populateListItem(li, updatedExpense);
}
// Save Expense
function saveExpense(li, expenseID) {
  editmode = false;
  const itemInput = li.querySelector(".item-input");
  console.log(itemInput);
  const updatedExpense = expenses.find((expense) => expense.id === expenseID);

  updatedExpense.item = itemInput.value;
  populateListItem(li, updatedExpense);
  console.log(expenses);
}
function formatDate(currentDate) {
  const monthIndex = currentDate.getMonth();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = monthNames[monthIndex];
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const formattedDate = currentMonth + " " + currentDay + ", " + currentYear;
  return formattedDate;
}
// When someone clicks submit
expenseForm.addEventListener("submit", (e) => {
  // Stop page from refreshing
  e.preventDefault();
  // Grab the value of the inputs
  let item = itemInput.value;
  let cost = costInput.value;
  // Validate Item Input: Field is empty? Fails=>Don't submit form
  if (item.trim() === "") {
    window.alert("Please enter an item");
    return;
  }
  // Validate Cost Input: Field is empty? Fails=>Don't submit form
  if (cost.trim() === "") {
    window.alert("Please enter a cost");
    return;
  }
  // Turn the input string into a number
  cost = parseFloat(cost);
  // Validate Cost Input: Value is a number? Fails =>Don't submit form
  if (isNaN(cost)) {
    window.alert("The cost value must be a number");
    return;
  }
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  // Passes => Create new expense object with item and cost
  let expense = { id: expenses.length + 1, item, cost, date: formattedDate };
  // Add new expense object to expense array
  expenses.push(expense);

  // Clear inputs
  itemInput.value = "";
  costInput.value = "";
  // Display expenses as a list item
  displayNewExpense(expense);
  // Last: Check to see if the form was submitted
  console.log("submitted", expense);
});
function displayNewExpense(expense) {
  createListItem(expense);
}
