'use strict';

const select1 = document.querySelector('.blog__select'),
  blogInner = document.querySelector('.blog__inner'),
  blogSelect = document.querySelector('.blog-select'),
  blogSelect1 = document.querySelector('.blog__select'),
  blogSelect2 = document.querySelectorAll('.blog__select')[1],
  blogSelect3 = document.querySelectorAll('.blog__select')[2],
  resetBtn = document.querySelector('.blog-select__reset');

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

const filter = (arr, select) => {
  const select1 = blogSelect1.options[blogSelect1.selectedIndex].value,
    select2 = blogSelect2.options[blogSelect2.selectedIndex].value,
    select3 = blogSelect3.options[blogSelect3.selectedIndex].value,
    target = event.target.options[event.target.selectedIndex].value;

  while (blogInner.firstChild) {
    blogInner.firstChild.remove();
  }


  arr = arr.filter((item) => {
      if (select1 !== '0') {
        if (item.movies) {

          return item.movies.find(x => x === select1);
        }
      } else {
        return item;
      }
    })
    .filter(item => select2 !== '0' ? item.status === select2 : item)
    .filter(item => select3 !== '0' ? item.gender.toLowerCase() === select3 : item);

  arr.forEach(item => {
    if (select === 'movies') {
      if (item.movies) {
        item.movies.forEach(elem => {
          if (elem === target) {
            addCard(item);
          }
        });
      }
    } else if (select === 'status') {
      if (item.status === target) {
        addCard(item);
      }
    } else if (select === 'gender') {
      if (item.gender.toLowerCase() === target) {
        addCard(item);
      }
    } else {
      addCard(item);
    }
  });
};

const defineFilter = (arr) => {
  const select1 = blogSelect1.options[blogSelect1.selectedIndex].value,
    select2 = blogSelect2.options[blogSelect2.selectedIndex].value,
    select3 = blogSelect3.options[blogSelect3.selectedIndex].value;

  const selectFilter = () => {
    if (event.target === blogSelect1 && select1 !== '0') {
      filter(arr, 'movies');
    } else if (event.target === blogSelect2 && select2 !== '0') {
      filter(arr, 'status');
    } else if (event.target === blogSelect3 && select3 !== '0') {
      filter(arr, 'gender');
    } else {
      filter(arr);
    }
  };

  const reset = () => {
    while (blogInner.firstChild) {
      blogInner.firstChild.remove();
    }

    blogSelect1.selectedIndex = 0;
    blogSelect2.selectedIndex = 0;
    blogSelect3.selectedIndex = 0;

    arr.forEach(element => {
      addCard(element);
    });
  };

  blogSelect.addEventListener('change', selectFilter);
  resetBtn.addEventListener('click', reset);
};

const addElem = (arr) => {
  let movies = [];

  arr.forEach((item) => {
    addCard(item);

    if (item.movies) {
      item.movies.forEach(elem => {
        movies.push(elem.trim());
      });
    }
  });

  movies = [...new Set(movies)].sort();

  movies.forEach(item => {
    select1.insertAdjacentHTML('beforeend',
      `<option value="${item}">${item}</option>`);
  });

  defineFilter(arr);
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