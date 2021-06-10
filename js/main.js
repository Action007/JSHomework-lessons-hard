'use strict';

let myFunc = (arg) => {
  if (typeof arg === 'string') {
    if (arg.length > 30) {
      console.log(arg.substring(0, 30) + "...");
    } else {
      console.log(arg);
    }
  } else {
    console.log('это не строка!');
  }
};

myFunc(prompt('Введите строку').trim());