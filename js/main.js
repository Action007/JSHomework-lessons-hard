'use strict';

let money = +prompt("Ваш месячный доход?");
let income = 'музыка';
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm("Есть ли у вас депозит в банке ?");
let mission = 10000;
let period = '9';
let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");
let accumulatedMonth = getAccumulatedMonth();
let final = Math.ceil(mission / accumulatedMonth);
let budgetDay = Math.floor(accumulatedMonth / 30);

function getExpensesMonth() {
  return amount1 + amount2;
}

function getAccumulatedMonth() {
  return money - (amount1 + amount2);
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

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(getExpensesMonth());
console.log(addExpenses.length);
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log('бюджет будет достигнуто через ' + getTargetMonth());
console.log('бюджет на день: ' + budgetDay);
console.log('бюджет на месяц: ' + accumulatedMonth);
console.log(getStatusIncome());