'use strict';

let wrapper = document.querySelector('.wrapper'),
  color = document.getElementById('color'),
  change = document.getElementById('change');

let randomize = () => {
  let random = '#' + Math.floor(Math.random() * 10000000).toString(16);
  wrapper.style.backgroundColor = random;
  color.textContent = random;
};

change.addEventListener('click', randomize);