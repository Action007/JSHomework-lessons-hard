'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let game = function () {

  let num = Math.floor(Math.random() * 100);
  let x = 10;
  let myFunc = () => {
    let quess = prompt('Угадай число от 1 до 100');
    if (quess === null) {
      return alert('Прощай!');
    }
    if (!isNumber(quess)) {
      --x;
      if (x === 0) {
        let lastQuess = confirm('Попытки закончились, хотите сыграть еще ?');
        if (lastQuess === true) {
          game();
        } else {
          return alert('Прощай!');
        }
      } else {
        alert(`Введи число, осталось попыток: ${x}`);
        myFunc();
      }
    } else if (+quess === num) {
      alert('Поздравляю, Вы угадали!!!');
      let finalQuess = confirm('Хотели бы сыграть еще?');
      if (finalQuess === true) {
        game();
      } else {
        return alert('Прощай!');
      }
    } else if (+quess > num) {
      --x;
      if (x === 0) {
        let lastQuess = confirm('Попытки закончились, хотите сыграть еще ?');
        if (lastQuess === true) {
          game();
        } else {
          return alert('Прощай!');
        }
      } else if (x !== 0) {
        alert(`Загаданное число меньше, осталось попыток: ${x}`);
        myFunc();
      }
    } else if (+quess < num) {
      --x;
      if (x === 0) {
        let lastQuess = confirm('Попытки закончились, хотите сыграть еще ?');
        if (lastQuess === true) {
          game();
        } else {
          return alert('Прощай!');
        }
      } else if (x !== 0) {
        alert(`Загаданное число больше, осталось попыток: ${x}`);
        myFunc();
      }
    }
  };

  myFunc();
};

game();