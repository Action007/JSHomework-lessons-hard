'use strict';

let num = 242523333333234,
  str = '        asdsadsdasd        ',
  strLong = 'ooooooooooooooooooooooooooooooooooooooooooooooooooooo';

let myFunc = (arg) => {
  if (typeof arg === 'string') {
    if (arg.length > 30) {
      console.log(arg.substring(0, 29).trim() + "...");
    } else {
      console.log(arg.trim());
    }
  } else {
    console.log('это не строка!');
  }
};

myFunc(strLong);