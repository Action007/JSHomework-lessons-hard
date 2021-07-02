'use strict';

let start1 = document.getElementById('start'),
  button1 = document.getElementsByTagName('button')[0],
  button2 = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelectorAll('.income-title')[1],
  additionalIncomeItem2 = document.querySelector('.additional_income-item'),
  additionalIncomeItem3 = document.querySelectorAll('.additional_income-item')[1],
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  incomeItems = document.querySelectorAll('.income-items');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let checkInput = function () {
  let num = document.querySelectorAll('input[placeholder="Сумма"]');
  let str = document.querySelectorAll('input[placeholder="Наименование"]');
  str.forEach(i => {
    i.addEventListener('input', function () {
      i.value = i.value.replace(/[^\D]/, '');
    });
  });
  num.forEach(i => {
    i.addEventListener('input', function () {
      i.value = i.value.replace(/[\D]/, '');
    });
  });
};

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  incomeMonth: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: () => {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должен быть заполнено!');
      return;
    }

    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: () => {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();


    let update = () => incomePeriodValue.value = periodSelect.value * appData.budgetMonth;
    periodSelect.addEventListener('input', update);
  },
  addIncomeBlock: () => {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, button1);
    incomeItems = document.querySelectorAll('.income-items');
    checkInput();

    if (incomeItems.length === 3) {
      button1.style.display = 'none';
    }
  },
  addExpensesBlock: () => {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, button2);
    expensesItems = document.querySelectorAll('.expenses-items');
    checkInput();

    if (expensesItems.length === 3) {
      button2.style.display = 'none';
    }
  },
  getExpenses: () => {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (!isNaN(itemExpenses) && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
      if (!isNaN(itemExpenses.value && cashExpenses !== '')) {
        alert('Введите число!');
      } else {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: () => {
    incomeItems.forEach((item) => {
      let incomeTitle = item.querySelector('.income-title').value;
      let incomeAmount = item.querySelector('.income-amount').value;
      if (incomeTitle !== '' && incomeAmount !== '') {
        appData.income[incomeTitle] = incomeAmount;
      }
    });
  },
  getAddExpenses: () => {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: () => {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getIncomeMonth: () => {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getBudget: () => {
    appData.budgetMonth = (appData.budget + appData.incomeMonth) - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: () => {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome: () => {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay > 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },
  getInfoDeposite: () => {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('какой годовой процент?', 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: () => {
    return appData.budgetMonth * periodSelect.value;
  }
};

let inputRange = () => {
  let update = () => periodAmount.innerHTML = periodSelect.value;
  periodSelect.addEventListener('input', update);
};


let update = () => {
  if (!isNumber(salaryAmount.value)) {
    alert('Введите число!');
  } else {
    appData.start();
  }
};
checkInput();

start1.addEventListener('click', update);
button2.addEventListener('click', appData.addExpensesBlock);
button1.addEventListener('click', appData.addIncomeBlock);
inputRange();