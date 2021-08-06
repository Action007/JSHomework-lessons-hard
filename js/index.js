'use strict';

const select = document.querySelector('.blog__select');
const blogInner = document.querySelector('.blog__inner');

const addCard = (item) => {
  blogInner.insertAdjacentHTML('beforeend',
    `
      <div class="card">
        <div class="card__front">
          <div class="card__inner">
            <img class="card__img" src="${item.photo}" alt="">
          </div>
        </div>
        <div class="card__back">
          <img class="card__img" src="${item.photo}" class="icon" />
          <div class="card__inner">
            <h3 class="card__title">${item.name}</h3>
            <ul class="card__items">
              ${(item.realName) ? 
              `<li class="card__item">Real Name: <span class="card__span">
              ${item.realName}
              </span></li>` : ''}
              ${(item.gender) ? 
              `<li class="card__item">Gender: <span class="card__span">
              ${item.gender}
              </span></li>` : ''}
              ${(item.birthDay) ? 
              `<li class="card__item">BirthDay: <span class="card__span">
              ${item.birthDay}
              </span></li>` : ''}
              ${(item.deathDay) ? 
              `<li class="card__item">DeathDay: <span class="card__span">
              ${item.deathDay}
              </span></li>` : ''}
              ${(item.status) ? 
              `<li class="card__item">Status: <span class="card__span">
              ${item.status}
              </span></li>` : ''}
              ${(item.actors) ? 
              `<li class="card__item">Actors: <span class="card__span">
              ${item.actors}
              </span></li>` : ''}
              ${(item.movies) ? 
              `<li class="card__item">Movies: <span class="card__span">
              ${item.movies}
              </span></li>` : ''}
            </ul>
          </div>
        </div>
      </div>
      `);
};

const filter = (arr) => {
  const blogSelect = document.querySelector('.blog__select');

  const selectFilter = () => {
    while (blogInner.firstChild) {
      blogInner.firstChild.remove();
    }

    arr.forEach(item => {
      if (item.movies) {
        item.movies.forEach(elem => {
          if (elem === event.target.options[select.selectedIndex].value) {
            addCard(item);
          }
        });
      }
    });

    if (event.target.options[select.selectedIndex].value === '0') {
      arr.forEach(item => {
        if (item.movies) {
          addCard(item);
        }
      });
    }
  };

  blogSelect.addEventListener('change', selectFilter);
};

const addElem = (arr) => {
  let movies = [];

  arr.forEach((item) => {
    addCard(item);

    if (item.movies) {
      item.movies.forEach(elem => {
        movies.push(elem);
      });
    }
  });

  movies = [...new Set(movies)].sort();

  movies.forEach(item => {
    select.insertAdjacentHTML('beforeend',
      `<option value="${item}">${item}</option>`);
  });

  filter(arr);
};

const getArray = () => {
  const postData = () => {
    return fetch('./dbHeroes.json');
  };

  postData()
    .then(response => {
      if (response.status !== 200) {
        throw new Error('status network not 200');
      }
      return response.json();
    })
    .then(response => {
      addElem(response);
    })
    .catch(error => console.log(error));
};

getArray();