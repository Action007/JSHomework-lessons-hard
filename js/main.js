'use strict';

let start = 0,
  finish = 100;

let arr = [
  '855',
  '4256',
  '2574',
  '2434',
  '3464',
  '3524',
  '474'
];

for (let i = 0; i < arr.length; i++) {
  if (arr[i].charAt(0) === '2' || arr[i].charAt(0) === '4') {
    console.log(arr[i]);
  }
}

let prime = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  if (num > 1) {
    return true;
  }
};

for (let i = start; i <= finish; i++) {
  if (prime(i)) {
    console.log(`Число ${i} простое и его делители 1 и ${i}`);
  }
}