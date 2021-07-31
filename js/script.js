'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
  }

  addToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
    <span class="text-todo">${todo.value}</span>
		<div class="todo-buttons">
			<button class="todo-edit"></button>
			<button class="todo-remove"></button>
			<button class="todo-complete"></button>
		</div>
    `);

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  editItem(target) {
    let text = target.parentNode.parentNode.querySelector('span');

    text.setAttribute("contenteditable", "true");

    text.addEventListener('keyup', () => {
      this.todoData.forEach((item) => {
        if (item.key === target.parentNode.parentNode.key) {
          item.value = text.textContent;
        }
        this.addToStorage();
      });
    });
  }

  deleteItem(target) {
    this.todoData.forEach((item, index) => {
      if (item.key === target.parentNode.parentNode.key) {
        this.todoData.delete(index, 1);
      }
    });

    this.render();
  }

  completedItem(target) {
    this.todoData.forEach((item) => {
      if (item.key === target.parentNode.parentNode.key) {
        if (item.completed === true) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
    });

    this.render();
  }

  handler() {
    const todoButtons = document.querySelector('.todo-container');

    todoButtons.addEventListener('click', (e) => {
      const target = e.target;
      const _this = this;

      if (target.classList.contains('todo-remove')) {
        this.animate({
          duration: 300,
          timing(timeFraction) {
            return timeFraction;
          },
          draw(progress) {
            target.parentNode.parentNode.style.transform = `translate(-${progress * 150 + '%'}, 0)`;
          },
          target,
          _this
        });
      }

      if (target.classList.contains('todo-complete')) {
        this.animate({
          duration: 250,
          timing(timeFraction) {
            return timeFraction;
          },
          draw(progress) {
            target.parentNode.parentNode.style.transform = `rotateX(-${progress * 100}deg`;
          },
          target,
          _this
        });
      }

      if (target.classList.contains('todo-edit')) this.editItem(target);
    });
  }

  animate({
    timing,
    draw,
    duration,
    target,
    _this
  }) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;

        if (target.classList.contains('todo-remove')) {
          _this.deleteItem(target);
        }

        if (target.classList.contains('todo-complete')) {
          _this.completedItem(target);
        }
      }
      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);

      draw(progress); // отрисовать её
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }

    });
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.handler();
  }

}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();