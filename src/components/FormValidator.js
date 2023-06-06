export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
    this._inputs = this._formElement.querySelectorAll(this._settings.inputSelector);
  }
  
  _validateInput(input) {
    this._setError(input, input.validationMessage);
}

    _setError(input, errorMessage) {
      const errorElement = input.nextElementSibling;
      errorElement.textContent = errorMessage;
      errorElement.style.display = errorMessage ? 'block' : 'none';
  }

  clearInputErrors() {
    this._inputs.forEach((input) => {
        this._setError(input, '');
    });
  }
  
    _toggleSubmitButton() {
      const isValidForm = this._formElement.checkValidity();
  
      this._buttonElement.classList.toggle(this._settings.submitButtonDisabledClass, !isValidForm);
      this._buttonElement.disabled = !isValidForm;
  }
  
    resetAndUpdateSubmitButton() {
      this._toggleSubmitButton();
    }
      
    _setEventListeners() {
      this._inputs.forEach((input) => {
        input.addEventListener('input', () => {
          this._validateInput(input);
          this._toggleSubmitButton();
        });
      });
  
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
      this._toggleSubmitButton();
    }
  
    enableValidation() {
      this._setEventListeners();
    }
  }