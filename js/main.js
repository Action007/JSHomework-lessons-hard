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

  countTimer('11 july 2021');

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
        if (i === 0){
          newDiv.classList += ' dot-active';
        } 
        dotParrent.append(newDiv);
      }
    };

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      dot = document.querySelectorAll('.dot');
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
});