'use strict';

const h1 = document.querySelector('.h1'),
  signUp = document.querySelector('.sign-up'),
  login = document.querySelector('.login'),
  list = document.querySelector('.list'),
  span = document.querySelector('.span'),
  input = document.querySelector('input');


let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];

const time = () => {
  let currentDatetime = new Date(),
    day = currentDatetime.getDate(),
    year = currentDatetime.getFullYear(),
    newDate = new Date().toTimeString().replace(/ .*/, '');

  return day + " июля " + year + " г., " + newDate;
};

const addUser = () => {
  localStorage.setItem('data', JSON.stringify(data));

  data.forEach((item, index) => {
    if (index === data.length - 1) {
      let li = document.createElement('li');
      let logOut = document.createElement('button');

      li.textContent = `Имя: ${item.firstName}, Фамилия: ${item.lastName},
      зарегистрирован: ${item.regDate}`;
      logOut.textContent = 'X';
      logOut.classList.add('remove');

      list.append(li);
      li.append(logOut);

      logOut.addEventListener('click', () => {
        data.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(data));

        li.remove();
      });
    }
  });
};

const getUser = () => {
  data.forEach((item, index) => {
    let li = document.createElement('li');
    let logOut = document.createElement('button');

    li.textContent = `Имя: ${item.firstName}, Фамилия: ${item.lastName},
      зарегистрирован: ${item.regDate}`;
    logOut.textContent = 'X';

    list.append(li);
    li.append(logOut);

    logOut.addEventListener('click', () => {
      data.splice(index, 1);
      localStorage.setItem('data', JSON.stringify(data));

      li.remove();
    });
  });
};

const logIn = () => {
  let log = prompt('Введите Логин'),
    password = prompt('Введите Пароль'),
    i = 1;

  data.forEach(item => {
    if (item.login === log && item.password === password) {
      span.textContent = item.firstName;
      return --i;
    }
  });
  if (i) alert('Пользователь не найден');
};


const test = (userName, log, password) => {
  let arrName = userName.split(' ');
  data.push({
    firstName: arrName[0],
    lastName: arrName[1],
    login: log,
    password: password,
    regDate: time()
  });


  addUser();
};

const start = () => {
  let userName = prompt('Введите через пробел имя и фамилию пользователя'),
    log = prompt('Введите Логин'),
    password = prompt('Введите Пароль'),
    result = userName.match(/^[a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+$/);

  if (log.trim() === '' && password.trim() === '') {
    alert('Введите логин и пароль');
  } else if (result) {
    test(userName, log, password);
  } else if (!result) {
    alert('Введите имя и фамилию');
  }
};

signUp.addEventListener('click', start);
login.addEventListener('click', logIn);

getUser();