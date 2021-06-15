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

function lastTime(value, words) {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return value + words[2];
  if (num > 1 && num < 5) return value + words[1];
  if (num === 1) return value + words[0];
  return value + words[2];
}

function time2() {
  let currentDatetime = new Date();
  let day = currentDatetime.getDate();
  let year = currentDatetime.getFullYear();
  let hours = lastTime(currentDatetime.getHours(), [' час', ' часа', ' часов']);
  let minutes = lastTime(currentDatetime.getMinutes(), [' минута ', ' минуты ', ' минут ']);
  let seconds = lastTime(currentDatetime.getSeconds(), [' секунда', ' секунды', ' секунд']);

  return "Сегодня Вторник, " + day + " июня " + year + " года, " + hours + " " +
    minutes + seconds;
}

setInterval(function () {
  document.getElementById('time').innerHTML = time2();
}, 1000);

setInterval(function () {
  document.getElementById('time2').innerHTML = dateTime();
}, 1000);