import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector); // Вызов конструктора родительского класса
      this._image = this._popup.querySelector('.popup__image'); // Элемент изображения в попапе
      this._caption = this._popup.querySelector('.popup__image-caption'); // Элемент подписи к изображению в попапе
    }
  
    // Метод открытия попапа с изображением
    open({ link, name }) {
      this._image.src = link; // Установка ссылки на изображение
      this._image.alt = name; // Установка альтернативного текста изображения
      this._caption.textContent = name; // Установка подписи к изображению
      super.open(); // Вызов метода открытия попапа родительского класса
    }
  }
  