window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // timer
  const countTimer = (deadline) => {
    const timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds'),
      span = document.querySelectorAll('.span');


    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    };

    const updateClock = () => {
      const timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      if (timer.timeRemaining > 0) {
        if (timerHours.textContent < 10) {
          timerHours.textContent = '0' + timerHours.textContent;
        }
        if (timerMinutes.textContent < 10) {
          timerMinutes.textContent = '0' + timerMinutes.textContent;
        }
        if (timerSeconds.textContent < 10) {
          timerSeconds.textContent = '0' + timerSeconds.textContent;
        }
      } else {
        clearInterval(SetTimer);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        timerHours.style.color = 'red';
        timerMinutes.style.color = 'red';
        timerSeconds.style.color = 'red';
        span.forEach(i => {
          i.style.color = 'red';
        });
      }
    };

    const SetTimer = setInterval(updateClock, 1000);
    updateClock();
  };

  countTimer('15 august 2021');

  // menu
  const toggleMenu = () => {
    const body = document.querySelector('body'),
      menu = document.querySelector('menu');

    let actionMenu = () => {
      menu.classList.toggle('active-menu');
    };
    body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('close-btn')) {
        actionMenu();
      } else if (target.closest('menu>ul>li')) {
        actionMenu();
      } else if (target.closest('.menu')) {
        actionMenu();
      } else if (menu.classList.value === 'active-menu') {
        target = target.closest('menu');
        if (!target) {
          actionMenu();
        }
      }
    });
  };
  toggleMenu();

  // popup
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn');

    let fadeIn = (element) => {
      element.style.display = 'block';
      if (screen.width > 768) {
        element.style.opacity = '0';
        let tick = () => {
          element.style.opacity = +element.style.opacity + 0.1;
          if (+element.style.opacity < 1) {
            setTimeout(tick, 16);
          }
        };
        tick();
      }
    };

    let fadeOut = (element) => {
      let tick = () => {
        if (+element.style.opacity !== 0) {
          element.style.opacity = +element.style.opacity - 0.1;
          setTimeout(tick, 16);
        } else {
          element.style.display = 'none';
        }
      };
      tick();
    };

    popupBtn.forEach(item => {
      item.addEventListener("click", () => {
        fadeIn(popup);
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        fadeOut(popup);
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          fadeOut(popup);
        }
      }
    });
  };

  togglePopup();

  // tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTab = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, index) => {
          if (item === target) {
            toggleTab(index);
          }
        });
        return;
      }
    });
  };
  tabs();

  // Smooth scrolling
  const scroll = () => {
    const scrollBtn = document.querySelector('a[href="#service-block"]'),
      scrollBlock = document.getElementById('service-block'),
      scrollMenu = document.querySelectorAll('menu>ul>li>a');

    scrollBtn.addEventListener('click', (event) => {
      event.preventDefault();
      scrollBlock.scrollIntoView({
        behavior: "smooth",
        block: 'start'
      });
    });

    scrollMenu.forEach(item => {
      item.addEventListener('click', (event) => {
        let link = item.getAttribute('href').substring(1),
          scrollBlock = document.getElementById(link);

        event.preventDefault();

        scrollBlock.scrollIntoView({
          behavior: "smooth",
          block: 'start'
        });
      });
    });
  };
  scroll();

  // slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dotParrent = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');
    let dot = document.querySelectorAll('.dot');

    let currentSlide = 0,
      interval;

    const dots = () => {
      dot.forEach(item => {
        item.parentNode.removeChild(item);
      });

      for (let i = 0; i < slide.length; i++) {
        let newDiv = document.createElement('li');
        newDiv.classList = 'dot';
        if (i === 0) {
          newDiv.classList.add('dot-active');
        }
        dotParrent.append(newDiv);
      }
      dot = document.querySelectorAll('.dot');
    };

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
    const startSlide = (time = 1500) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((item, index) => {
          if (item === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide();
      }
    });

    dots();
    startSlide(1500);
  };
  slider();

  //lesson23
  const start = () => {
    const img = document.querySelectorAll('.command__photo'),
      calcItems = document.querySelectorAll('input.calc-item'),
      formName = document.querySelectorAll('.form-name'),
      formPhone = document.querySelectorAll('.form-phone'),
      formMessage = document.getElementById('form2-message');

    img.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        e.target.src = e.target.dataset.img;
      });
      item.addEventListener('mouseleave', (e) => {
        e.target.src = e.target.dataset.img.replace(/a(?=\.jpg)/, '');
      });
    });

    const validateName = (e) => {
      e.target.value = e.target.value.replace(/[^\А-Яа-я ]/, '');
    };

    const validatePhone = (e) => {
      e.target.value = e.target.value.replace(/[^\d-()+]/g, '');
    };

    const validateMessage = (e) => {
      e.target.value = e.target.value.replace(/[^\А-Яа-я\d'";:_/.{},()?!* ]/, '');
    };

    // BLUR
    calcItems.forEach((calcItem) => {
      calcItem.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
      });
    });
    formName.forEach(element => {
      element.addEventListener('input', validateName);
    });
    formPhone.forEach(element => {
      element.addEventListener('input', validatePhone);
    });
    formMessage.addEventListener('input', validateMessage);
  };
  start();

  // calculator
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      let squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', (e) => {
      const target = e.target;
      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  };

  calc(100);


  // send-ajax-form

  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так',
      loadMassage = 'Загрузка...',
      succsessMessage = 'Спасибо! Скоро мы с вами свяжемся!';
    const form1 = document.getElementById('form1'),
      form2 = document.getElementById('form2'),
      form3 = document.getElementById('form3'),
      input = document.querySelectorAll('input');
    const statusMessage = document.createElement('div'),
      img = document.createElement('img');

    statusMessage.style.cssText = `
    font-size: 2rem;
    color: white;`;

    const formFunc = (form) => {
      form.appendChild(statusMessage);
      statusMessage.textContent = loadMassage;
      img.style.cssText = `
      margin-right: 10px;
      width: 25px;`;
      img.src = 'images/load2.gif';
      statusMessage.insertBefore(img, statusMessage.firstChild);

      const formData = new FormData(form);
      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body,
        () => {
          input.forEach(item => {
            item.value = '';
          });
          statusMessage.textContent = succsessMessage;
          img.style.cssText = `
          margin-right: 10px;
          width: 25px;`;
          img.src = 'images/success.png';
          statusMessage.insertBefore(img, statusMessage.firstChild);
        },
        (error) => {
          console.log(error);
          statusMessage.textContent = errorMessage;
          img.style.cssText = `
          margin-right: 10px;
          width: 25px;`;
          img.src = 'images/error.png';
          statusMessage.insertBefore(img, statusMessage.firstChild);
        });
    };

    form1.addEventListener('submit', (event) => {
      event.preventDefault();
      formFunc(form1);
    });
    form2.addEventListener('submit', (event) => {
      event.preventDefault();
      formFunc(form2);
    });
    form3.addEventListener('submit', (event) => {
      event.preventDefault();
      formFunc(form3);
    });

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'aplication/json');
      request.send(JSON.stringify(body));
    };
  };

  sendForm();
});