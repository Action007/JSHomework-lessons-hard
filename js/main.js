'use strict';

let lang = prompt('Введите язык');
let namePerson = prompt('Введите имя');
let final1;
let final2;

// Вариант a
if (lang === 'ru') {
  console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
} else if (lang === 'en') {
  console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else {
  console.log('введите язык!');
}

// Вариант b
switch (lang) {
  case 'ru':
    console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
    break;
  case 'en':
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
  default:
    console.log('введите язык!');
}

// Вариант c
const myObj = {
  'ru': ['Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'],
  'en': ['Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday']
};

final1 = lang === 'ru' ? myObj.ru : lang === 'en' ? myObj.en : 'введите en или ru';
final2 = namePerson === 'Артем' ? 'директор' : namePerson === 'Максим' ? 'преподаватель' : 'студент';

console.log(final1);
console.log(final2);