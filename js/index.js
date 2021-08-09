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
  incomeAmount = document.querySelectorAll('.income-amount'),
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
  depositPercent = document.querySelector('.deposit-percent'),
  resultTotal1 = document.querySelectorAll('.result-total')[0],
  resultTotal2 = document.querySelectorAll('.result-total')[1],
  resultTotal3 = document.querySelectorAll('.result-total')[2],
  resultTotal4 = document.querySelectorAll('.result-total')[3],
  resultTotal5 = document.querySelectorAll('.result-total')[4],
  resultTotal6 = document.querySelectorAll('.result-total')[5],
  resultTotal7 = document.querySelectorAll('.result-total')[6];

let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');

let localAppData = localStorage.getItem('localAppData') ?
  JSON.parse(localStorage.getItem('localAppData')) : [];

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
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
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

    localAppData.push({
      budgetMonth: budgetMonthValue.value
    }, {
      budgetDay: budgetDayValue.value
    }, {
      expensesMonth: expensesMonthValue.value
    }, {
      additionalExpenses: additionalExpensesValue.value
    }, {
      additionalIncome: additionalIncomeValue.value
    }, {
      incomePeriod: incomePeriodValue.value
    }, {
      targetMonth: targetMonthValue.value
    });

    this.localStorage();

    this.setCookie('budgetMonth', budgetMonthValue.value, 2021, 12, 1);
    this.setCookie('budgetDay', budgetDayValue.value, 2021, 12, 1);
    this.setCookie('expensesMonth', expensesMonthValue.value, 2021, 12, 1);
    this.setCookie('additionalExpenses', additionalExpensesValue.value, 2021, 12, 1);
    this.setCookie('additionalIncome', additionalIncomeValue.value, 2021, 12, 1);
    this.setCookie('incomePeriod', incomePeriodValue.value, 2021, 12, 1);
    this.setCookie('targetMonth', targetMonthValue.value, 2021, 12, 1);

  }

  localStorage() {
    localStorage.setItem('localAppData', JSON.stringify(localAppData));
  }

  getLocal() {
    if (localStorage.getItem('localAppData')) {

      document.querySelectorAll('input').forEach(item => {
        item.disabled = true;
      });

      start1.style.display = "none";
      cancel.style.display = "block";

      localAppData.forEach(item => {
        if (item.budgetMonth) {
          resultTotal1.value = item.budgetMonth;
          if (item.budgetMonth !== this.getCookie('budgetMonth')) this.reset();
        }
        if (item.budgetDay) {
          resultTotal2.value = item.budgetDay;
          if (item.budgetDay !== this.getCookie('budgetDay')) this.reset();
        }
        if (item.expensesMonth) {
          resultTotal3.value = item.expensesMonth;
          if (item.expensesMonth !== this.getCookie('expensesMonth')) this.reset();
        }
        if (item.additionalExpenses) {
          resultTotal4.value = item.additionalExpenses;
          if (item.additionalExpenses !== this.getCookie('additionalExpenses')) this.reset();
        }
        if (item.additionalIncome) {
          resultTotal5.value = item.additionalIncome;
          if (item.additionalIncome !== this.getCookie('additionalIncome')) this.reset();
        }
        if (item.incomePeriod) {
          resultTotal6.value = item.incomePeriod;
          if (item.incomePeriod !== this.getCookie('incomePeriod')) this.reset();
        }
        if (item.targetMonth) {
          resultTotal7.value = item.targetMonth;
          if (item.targetMonth !== this.getCookie('targetMonth')) this.reset();
        }
      });
    }
  }

  setCookie(key, value, year, month, day, path, domain, secure) {
    let cookieStr = encodeURI(key) + '=' + encodeURI(value);
    if (year) {
      const expires = new Date(year, month - 1, day);
      cookieStr += '; expires=' + expires.toGMTString();
    } else {
      const expires = new Date();
      expires.setMonth(expires.getMonth() + 1);
      cookieStr += '; expires=' + expires.toGMTString();
    }
    cookieStr += path ? '; path=' + encodeURI(path) : '';
    cookieStr += domain ? '; domain=' + encodeURI(domain) : '';
    cookieStr += secure ? '; secure' : '';

    document.cookie = cookieStr;
  }


  getCookie(sKey) {
    if (!sKey) {
      return '';
    }
    return decodeURIComponent(document.cookie
      .replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
        "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || '';
  }

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, button1);
    incomeItems = document.querySelectorAll('.income-items');
    this.checkInput();
    if (incomeItems.length === 3) {
      button1.style.display = 'none';
    }
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, button2);
    expensesItems = document.querySelectorAll('.expenses-items');
    this.checkInput();
    if (expensesItems.length === 3) {
      button2.style.display = 'none';
    }
  }

  getIncome() {
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach((item, i) => {
      const incomeTitle = item.querySelector('.income-title').value;
      const incomeAmount = item.querySelector('.income-amount').value;
      if (incomeTitle !== '' && incomeAmount !== '') {
        this.income[incomeTitle + i] = incomeAmount;
      }
    });
  }

  getExpenses() {
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach((item, i) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses + i] = cashExpenses;
      }
    });
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach(item => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
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

    localAppData = [];
    localStorage.removeItem('localAppData');

    this.setCookie('budgetMonth', '', 2020, 12, 1);
    this.setCookie('budgetDay', '', 2020, 12, 1);
    this.setCookie('expensesMonth', '', 2020, 12, 1);
    this.setCookie('additionalExpenses', '', 2020, 12, 1);
    this.setCookie('additionalIncome', '', 2020, 12, 1);
    this.setCookie('targetMonth', '', 2020, 12, 1);
    this.setCookie('incomePeriod', '', 2020, 12, 1);
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
    button2.addEventListener('click', this.addExpensesBlock.bind(this));
    button1.addEventListener('click', this.addIncomeBlock.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    this.inputRange();
  }
}

const appData = new AppData();
appData.checkInput();
appData.eventsListeners();
appData.getLocal();