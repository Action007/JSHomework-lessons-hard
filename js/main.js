'use strict';

function firstTime(value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}

function dateTime() {
  let currentDatetime = new Date();
  let day = firstTime(currentDatetime.getDate());
  let month = firstTime(currentDatetime.getMonth() + 1);
  let year = currentDatetime.getFullYear();
  let hours = firstTime(currentDatetime.getHours());
  let minutes = firstTime(currentDatetime.getMinutes());
  let seconds = firstTime(currentDatetime.getSeconds());

  return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
}

let lastTime = function (number, titles) {
  let cases = [2, 0, 1, 1, 1, 2];
  if (number !== 0) {
    return titles[
      (number % 100 > 4 && number % 100 < 20) ?
      2 :
      cases[(number % 10 < 5) ? number % 10 : 5]
    ];
  } else {
    return "00 часов";
  }
};

function time2() {
  let currentDatetime = new Date();
  let day = currentDatetime.getDate();
  let year = currentDatetime.getFullYear();
  let hours = lastTime(currentDatetime.getHours(), ['час', 'часа', 'часов']);
  let minutes = currentDatetime.getMinutes();
  let seconds = currentDatetime.getSeconds();

  return "Сегодня Вторник, " + day + " июня " + year + " года, " + hours + " " +
    minutes + " минут " + seconds + " секунды";
}

setInterval(function () {
  document.getElementById('time').innerHTML = time2();
}, 1000);

setInterval(function () {
  document.getElementById('time2').innerHTML = dateTime();
}, 1000);