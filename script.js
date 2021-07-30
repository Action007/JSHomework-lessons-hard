document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const select = document.getElementById('cars'),
    output = document.getElementById('output');

  const getData = () => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', './cars.json');
      request.setRequestHeader('Content-type', 'application/json');
      request.send();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.readyState === 4 && request.status === 200) {
          resolve(request);
        } else {
          reject();
        }
      });
    });
  };

  const readyChange = (request) => {
    const data = JSON.parse(request.responseText);
    data.cars.forEach(item => {
      if (item.brand === select.value) {
        const {
          brand,
          model,
          price
        } = item;
        output.innerHTML = `
          Тачка ${brand} ${model} 
          <br>
          Цена: ${price}$`;
      }
    });
  };

  select.addEventListener('change', () => {
    getData()
      .then((request) => {
        readyChange(request);
      })
      .catch(error => {
        output.innerHTML = 'Произошла ошибка';
        console.error(error);
      });
  });
});