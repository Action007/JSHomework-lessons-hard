'use strict';

let money;

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = () => {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: () => {
    appData.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую")
      .toLowerCase().split(', ');
    appData.deposit = confirm("Есть ли у вас депозит в банке ?");

    for (let i = 0; i < 2; i++) {
      let expenses = prompt('Введите обязательную статью расходов?');
      let sum = +prompt('Во сколько это обойдется?');

      appData.expenses[expenses] = sum;
    }
  },
  getExpensesMonth: () => {
    for (let key in appData.expenses) {
      appData.expensesMonth = appData.expensesMonth + appData.expenses[key];
    }
  },
  getBudget: () => {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: () => {
    return Math.ceil(appData.mission / appData.budgetMonth);
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
  finalFunc: () => {
    for(let key in appData) {
      console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('расход за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
appData.finalFunc();