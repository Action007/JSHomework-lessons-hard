'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let game = function () {

  let num = 77;
  let myFunc = () => {
    for (let x = 9; x >= 0; x--) {
      let quess = prompt('Угадай число от 1 до 100');
      if (quess === null) {
        return alert('Прощай!');
      }
      if (!isNumber(quess)) {
        alert(`Введи число, загаданное число меньше, осталось попыток: ${x}`);
      } else if (+quess === num) {
        alert('Поздравляю, Вы угадали!!!');
        let finalQuess = confirm('Хотели бы сыграть еще?');
        if (finalQuess === true) {
          myFunc();
        }
        return;
      } else if (+quess > num) {
        alert(`Загаданное число меньше, осталось попыток: ${x}`);
      } else if (+quess < num) {
        alert(`Загаданное число больше, осталось попыток: ${x}`);
      }
    }
  };

  myFunc();

  let lastQuess = confirm('Попытки закончились, хотите сыграть еще ?');
  if (lastQuess === true) {
    myFunc();
  }
};

game();