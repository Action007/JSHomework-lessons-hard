'use strict';

let input = document.querySelector('input'),
  p = document.querySelector('p');

  console.log(input);
  console.log(p);

const setFunc = () => {
  p.textContent = input.value;
};

const timeOut = () => {
  let time;
  return () => {
    clearTimeout(time);

    time = setTimeout(setFunc, 300);
  };
};

input.addEventListener('keyup', timeOut());