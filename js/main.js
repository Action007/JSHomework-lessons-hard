'use strict';

let arr,
  week = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  for (let i = 0; i < week.length; i++) {
    if (i < 5) {
      document.write(`${week[i]}</br>`);
    } else if (i === 5) {
      document.write(`<i>${week[i]}</i></br>`);
    }
    else {
      document.write(`<strong>${week[i]}</strong></br>`);
    }
}