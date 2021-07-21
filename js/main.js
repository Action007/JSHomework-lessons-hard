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

const test = (userName, log, password) => {
  let arrName = userName.split(' ');
  data.push({
    firstName: arrName[0],
    lastName: arrName[1],
    login: log,
    password: password,
    regDate: time()
  });

  localStorage.setItem('data', JSON.stringify(data));

  let li = document.createElement('li');
  let logOut = document.createElement('button');

  li.textContent = `Имя: ${data[0].firstName}, Фамилия: ${data[0].lastName},
  зарегистрирован: ${data[0].regDate}`;

  logOut.textContent = 'X';
  list.append(li);
  li.append(logOut);
  span.textContent = data[0].firstName;
};

const logIn = () => {
  let userName = prompt('Введите через пробел имя и фамилию пользователя'),
    log = prompt('Введите Логин'),
    password = prompt('Введите Пароль'),
    result = userName.match(
      /^[a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+$/
    );

  if (result) {
    test(userName, log, password);
  }
  console.log(data);
};

signUp.addEventListener('click', () => {
  logIn();
});