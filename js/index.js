'use strict';

const start1 = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  button1 = document.getElementsByTagName('button')[0],
  button2 = document.getElementsByTagName('button')[1],
  depositCheck = document.getElementById('deposit-check'),
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
  incomeTitle2 = document.querySelectorAll('.income-title'),
  additionalIncomeItem2 = document.querySelector('.additional_income-item'),
  additionalIncomeItem3 = document.querySelectorAll('.additional_income-item')[1],
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  data = document.querySelector('.data'),
  input = data.querySelectorAll('input'),
  reset = document.querySelectorAll('input'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  start() {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должен быть заполнено!');
      return;
    }
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getExpInc();
    this.getIncomeMonth();
    this.getBudget();
    this.showResult();
  }

  checkInput() {
    const num = document.querySelectorAll('input[placeholder="Сумма"]');
    const str = document.querySelectorAll('input[placeholder="Наименование"]');
    const percent = document.querySelector('input[placeholder="Процент"]');
    str.forEach(i => {
      i.addEventListener('input', () => {
        i.value = i.value.replace(/[\d]/, '');
      });
    });
    num.forEach(i => {
      i.addEventListener('input', () => {
        i.value = i.value.replace(/[\D]/, '');
      });
    });
    percent.addEventListener('input', () => {
      percent.value = percent.value.replace(/[\D]/, '');
    });
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
  }

  addExpInc() {
    const target = event.target;
    const strClass = target.parentNode.className;
    const cloneItem = document.querySelector(`.${strClass}-items`).cloneNode(true);

    cloneItem.querySelector(`.${strClass}-title`).value = '';
    cloneItem.querySelector(`.${strClass}-amount`).value = '';
    target.parentNode.insertBefore(cloneItem, target);

    this.checkInput();

    incomeItems = document.querySelectorAll('.income-items');
    expensesItems = document.querySelectorAll('.expenses-items');

    if (document.querySelectorAll(`.${strClass}-items`).length === 3) {
      target.style.display = 'none';
    }
  }

  getExpInc() {

    const count = (item, i) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
      }
    };

    expensesItems.forEach(count);
    incomeItems.forEach(count);
  }

  getAddExpInc() {
    const filter = (item) => {
      return item.map(item => item.trim()).filter(item => item !== '');
    };

    this.addExpenses = filter(additionalExpensesItem.value.split(','));
    this.addIncome = filter([additionalIncomeItem[0].value, additionalIncomeItem[1]].value);
  }

  getExpensesMonth() {
    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

  getIncomeMonth() {
    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

    this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay > 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  }

  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  reset() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    input.forEach(item => {
      item.disabled = false;
    });
    start1.style.display = "block";
    cancel.style.display = "none";
    reset.forEach(i => {
      i.value = '';
    });
    periodSelect.value = '1';
    incomeItems.forEach((x, index) => {
      if (index !== 0) {
        x.remove();
      }
    });
    expensesItems.forEach((x, index) => {
      if (index !== 0) {
        x.remove();
      }
    });
    button1.style.display = 'block';
    button2.style.display = 'block';
  }

  inputRange() {
    const update = () => {
      periodAmount.innerHTML = periodSelect.value;
    };
    periodSelect.addEventListener('input', update);
  }


  update() {
    if (depositPercent.value <= 100 && depositPercent.value > 0) {
      if (!isNumber(salaryAmount.value)) {
        alert('Введите число!');
      } else {
        this.start();
        document.querySelectorAll('input').forEach(item => {
          item.disabled = true;
        });
        start1.style.display = "none";
        cancel.style.display = "block";
      }
    } else if (depositPercent.value === '') {
      if (!isNumber(salaryAmount.value)) {
        alert('Введите число!');
      } else {
        this.start();
        document.querySelectorAll('input').forEach(item => {
          item.disabled = true;
        });
        start1.style.display = "none";
        cancel.style.display = "block";
      }
    } else {
      alert('Введите корректное значение в поле проценты!');
      depositPercent.value = '';
    }
  }

  getInfoDeposit() {
    if (this.deposit === true) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePersent() {
    const selectValue = this.value;
    if (selectValue === 'other') {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.value = selectValue;
      depositPercent.style.display = 'none';
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePersent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePersent);
    }
  }

  eventsListeners() {
    start1.addEventListener('click', this.update.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    button2.addEventListener('click', this.addExpInc.bind(this));
    button1.addEventListener('click', this.addExpInc.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    this.inputRange();
  }
}

const appData = new AppData();
appData.checkInput();
appData.eventsListeners();