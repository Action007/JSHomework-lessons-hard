'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.myFunc = function () {
  if (this.selector.startsWith('.')) {
    let myClass = document.createElement('div');
    myClass.className = this.selector;
    myClass.textContent = 'Hello World';
    document.body.append(myClass);
    myClass.style.cssText = `background-color: ${this.bg};
    width: ${this.width};
    height: ${this.height};
    font-size: ${this.fontSize};`;
  } else if (this.selector.startsWith('#')) {
    let myId = document.createElement('p');
    myId.id = this.selector;
    myId.textContent = 'Hello World';
    document.body.append(myId);
    myId.style.cssText = `background-color: ${this.bg};
    width: ${this.width};
    height: ${this.height};
    font-size: ${this.fontSize};`;
  } else {
    alert('Введите КЛАСС или ID!');
  }
};

const obj = new DomElement('.asd', '30px', '100px', 'yellow', '20px');

obj.myFunc();