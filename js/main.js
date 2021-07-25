'use strict';

const start = document.getElementById('start'),
  reset = document.getElementById('reset'),
  img = document.getElementById('img');

let animate = 0,
  count = 0,
  i = 0;

const startcar = () => {
  img.style.left = count + 'px';
  count += 2;
  i++;

  if (count < (document.documentElement.clientWidth - img.clientWidth)) animate = requestAnimationFrame(startcar);
};

const pauseCar = () => {
  cancelAnimationFrame(animate);
  i = 0;
};

const cancel = () => {
  cancelAnimationFrame(animate);
  img.style.left = 0 + 'px';
  count = 0;
  i = 0;
};

start.addEventListener('click', () => {
  if (!i) {
    requestAnimationFrame(startcar);
  } else {
    pauseCar();
  }
});

reset.addEventListener('click', cancel);