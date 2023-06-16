export default class Section {
    // Конструктор класса принимает объект с двумя свойствами: items и renderer, и селектор контейнера
    constructor({ renderer }, containerSelector) {
      this._renderer = renderer; // Функция, отвечающая за создание и отрисовку данных на странице
      this._container = document.querySelector(containerSelector); // Контейнер для добавления элементов
    }
  
    // Метод для отрисовки всех элементов
    renderItems(items) {
      items.forEach(item => this._renderer(item)); // Отрисовка каждого элемента функцией renderer
    }
  
    // Метод для добавления элемента в контейнер
    addItem(element) {
      this._container.prepend(element); // Добавление элемента в контейнер
    }
  }
  