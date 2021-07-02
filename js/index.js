'use strict';

function DomElement(height, width, bg, fontSize) {
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.myFunc = function () {
  let myClass = document.createElement('div');
  document.body.append(myClass);
  myClass.style.cssText = `background-color: ${this.bg};
    width: ${this.width};
    height: ${this.height};
    font-size: ${this.fontSize};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)`;

  function start(e) {
    let cs = window.getComputedStyle(myClass);
    let left = parseInt(cs.marginLeft);
    let top = parseInt(cs.marginTop);
    switch (e.key) {
      case "ArrowUp":
        myClass.style.top = top + 48 + "%";
        break;
      case "ArrowRight":
        myClass.style.left = left + 52 + "%";
        break;
      case "ArrowDown":
        myClass.style.top = top + 52 + "%";
        break;
      case "ArrowLeft":
        myClass.style.left = left + 48 + "%";
        break;
    }
  }
  addEventListener("keydown", start);
};

const obj = new DomElement('100px', '100px', 'black');

obj.myFunc();