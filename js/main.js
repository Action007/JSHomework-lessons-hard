window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const exchange = () => {
    const select1 = document.querySelector('.select1'),
      select2 = document.querySelector('.select2'),
      getResult = document.querySelector('.button'),
      result = document.querySelector('.input2'),
      form = document.querySelector('form');

    const currency = [];

    const getCurrency = (array) => {
      const usdEuro = 1 / array.USD,
        usdRub = array.RUB / array.USD,
        rubUsd = array.USD / array.RUB,
        rubEuro = 1 / array.RUB;

      currency.push({
        EUR: {
          'USD': array.USD,
          'RUB': array.RUB
        }
      }, {
        USD: {
          'EUR': usdEuro,
          'RUB': usdRub
        }
      }, {
        RUB: {
          'USD': rubUsd,
          'EUR': rubEuro
        }
      });
    };


    const postData = () => {
      return fetch('http://data.fixer.io/api/latest?access_key=a168b0fe59c63441b04d86a226da3c87&symbols=USD,RUB');
    };

    postData()
      .then(response => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        return response.json();
      })
      .then(response => {
        getCurrency(response.rates);
      })
      .catch(error => console.log(error));

    const setResult = () => {
      const from = select1.options[select1.selectedIndex].value,
        to = select2.options[select2.selectedIndex].value,
        input1 = document.querySelector('.input1');


      currency.forEach((item) => {

        for (const key in item) {

          if (key === from) {

            for (const clef in item[key]) {
              let value = item[key][clef];

              if (clef === to) {
                let res = input1.value * value;
                result.value = res.toFixed(2);
              }
            }
          }
        }
      });
    };

    getResult.addEventListener('click', (e) => {
      e.preventDefault();
      setResult();
    });
  };

  exchange();
});