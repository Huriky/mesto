import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    // Конструктор класса принимает селектор попапа и колбэк сабмита формы
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector); // Вызов конструктора родительского класса
      this._handleFormSubmit = handleFormSubmit; // Колбэк сабмита формы
      this._form = this._popup.querySelector('.popup__form'); // Форма в попапе
    }
  
    // Метод сбора данных полей формы
    _getInputValues() {
      this._inputList = this._form.querySelectorAll('.popup__input'); // Список полей ввода формы
      this._formValues = {}; // Объект для хранения данных формы
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value; // Сбор данных формы
      });
      return this._formValues;
    }
  
    // Метод установки обработчиков событий
    setEventListeners() {
      super.setEventListeners(); // Вызов метода установки обработчиков событий родительского класса
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault(); // Отмена стандартного поведения формы
        this._handleFormSubmit(this._getInputValues()); // Вызов колбэка сабмита формы с данными формы
        this.close(); // Закрытие попапа
      });
    }
  
    // Метод закрытия попапа
    close() {
      super.close(); // Вызов метода закрытия попапа родительского класса
      this._form.reset(); // Сброс данных формы
    }
  }
  