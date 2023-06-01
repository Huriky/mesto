export default class Popup {
    // Конструктор класса принимает селектор попапа
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector); // Попап
      this._handleEscClose = this._handleEscClose.bind(this); // Привязка контекста к методу
    }
  
    // Метод открытия попапа
    open() {
      this._popup.classList.add('popup_opened'); // Добавление класса, открывающего попап
      document.addEventListener('keydown', this._handleEscClose); // Добавление обработчика закрытия попапа по нажатию на Esc
    }
  
    // Метод закрытия попапа
    close() {
      this._popup.classList.remove('popup_opened'); // Удаление класса, открывающего попап
      document.removeEventListener('keydown', this._handleEscClose); // Удаление обработчика закрытия попапа по нажатию на Esc
    }
  
    // Метод закрытия попапа по нажатию на Esc
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close(); // Закрытие попапа
      }
    }
  
    // Метод установки обработчиков событий
    setEventListeners() {
      this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close()); // Добавление обработчика закрытия попапа по клику на иконку закрытия
      this._popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close(); // Закрытие попапа по клику на затемнённую область вокруг формы
        }
      });
    }
  }
  