'use strict';

const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const addButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');
const totalText = document.getElementById('total');

let expenses = [];

function convertAmount(text) {
  return Number(text.replace(',', '.'));
}

function showExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  for (const expense of expenses) {
    const li = document.createElement('li');
    li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
    expenseList.appendChild(li);
    total += expense.amount;
  }
  totalText.textContent = total.toFixed(2);
}

function addExpense() {
  const name = nameInput.value.trim();
  const amount = convertAmount(amountInput.value.trim());

  if (!name || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid expense name and amount.');
    return;
  }

  expenses.push({name, amount});
  nameInput.value = '';
  amountInput.value = '';
  nameInput.focus();

  showExpenses();
}

addButton.addEventListener('click', addExpense);
