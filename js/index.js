'use strict';

let start1 = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
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
  incomeItems = document.querySelectorAll('.income-items'),
  data = document.querySelector('.data'),
  input = data.querySelectorAll('input'),
  reset = document.querySelectorAll('input');


let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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
  start: function () {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должен быть заполнено!');
      return;
    }
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, button1);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      button1.style.display = 'none';
    }
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, button2);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      button2.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let incomeTitle = item.querySelector('.income-title').value;
      let incomeAmount = item.querySelector('.income-amount').value;
      if (incomeTitle !== '' && incomeAmount !== '') {
        appData.income[incomeTitle] = incomeAmount;
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
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
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getIncomeMonth: function () {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay > 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },
  getInfoDeposite: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('какой годовой процент?', 10);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  }
};

let inputRange = function () {
  let update = function () {
    periodAmount.innerHTML = periodSelect.value;
  };
  periodSelect.addEventListener('input', update);
};


let update = function () {
  if (!isNumber(salaryAmount.value)) {
    alert('Введите число!');
  } else {
    appData.start();
    input.forEach(item => {
      item.disabled = true;
    });
    start1.style.display = "none";
    cancel.style.display = "block";
  }
};

start1.addEventListener('click', update);
cancel.addEventListener('click', function () {
  input.forEach(item => {
    item.disabled = false;
  });
  start1.style.display = "block";
  cancel.style.display = "none";
  reset.forEach(i => {
    i.value = '';
  });
  periodSelect.value = '1';
});
button2.addEventListener('click', appData.addExpensesBlock);
button1.addEventListener('click', appData.addIncomeBlock);
inputRange();

console.log('расходы за месяц ' + appData.expensesMonth);
console.log(appData.getStatusIncome());