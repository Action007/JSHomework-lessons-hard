'use strict';

let money;
let income = 'музыка';
let addExpenses;
let deposit;
let mission = 10000;
let period = '9';
let accumulatedMonth;
let budgetDay;
let expenses = [];
let expensesAmount;

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

do {
  money = prompt('Ваш месячный доход?');
} while (!isNumber(money));


function getAccumulatedMonth() {
  return money - expensesAmount;
}

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay > 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};

let getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?"');

    sum += +prompt('Во сколько это обойдется?');
  }

  console.log(expenses);
  return sum;
};

function TargetMonth() {
  if (accumulatedMonth < 0) {
    console.log('Цель не будет достигнута');
  } else {
    console.log('бюджет будет достигнуто через ' + getTargetMonth());
  }
}

addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке ?");
expensesAmount = getExpensesMonth();
accumulatedMonth = getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth / 30);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(expensesAmount);
console.log(addExpenses.length);
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log('бюджет на день: ' + budgetDay);
console.log('бюджет на месяц: ' + accumulatedMonth);
console.log(getStatusIncome());
TargetMonth();


// let expenses1 = prompt("Введите обязательную статью расходов?", "садик государственный"),
//   expenses1Aumont = +prompt("Во сколько это обойдется?", 2500),
//   expenses2 = prompt("Введите обязательную статью расходов?", "садик частный"),
//   expenses2Aumont = +prompt("Во сколько это обойдется?", 15000);