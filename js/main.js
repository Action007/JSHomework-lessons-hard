'use strict';

let num = 266219;
let result = 1;
let final;

for(let x = 0; x < String(num).length; x++) {
  result *= String(num)[x];
}

final = result ** 3;

console.log(String(final).slice(0, 2));