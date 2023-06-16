import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input"); // Инициализация в конструкторе
    this.submitButton = this._form.querySelector(".popup__submit-button");
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  async _handleSubmit(evt) {
    evt.preventDefault();
    const originalText = this.submitButton.textContent;
    this.submitButton.textContent = "Сохранение...";
  
    try {
      await this._handleFormSubmit(this._getInputValues());
      this.close();
    } catch (error) {
      console.error('Ошибка', error);
      // здесь можно выводить сообщение об ошибке для пользователя
    } finally {
      this.submitButton.textContent = originalText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}