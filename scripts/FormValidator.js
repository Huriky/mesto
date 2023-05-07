export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
  }
  
    _validateInput(input) {
      const errorElement = input.nextElementSibling;
  
      if (!input.validity.valid) {
        errorElement.textContent = input.validationMessage;
        errorElement.style.display = 'block';
      } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      }
    }

    clearInputErrors() {
      const inputs = this._formElement.querySelectorAll(this._settings.inputSelector);
      inputs.forEach((input) => {
          const errorElement = input.nextElementSibling;
          errorElement.textContent = '';
          errorElement.style.display = 'none';
      });
  }
  
    _toggleSubmitButton() {
      const submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
      const isValidForm = this._formElement.checkValidity();
  
      this._buttonElement.classList.toggle(this._settings.submitButtonDisabledClass, !isValidForm);
      this._buttonElement.disabled = !isValidForm;
  }  
  
    _disableButton(button) {
      this._buttonElement.classList.add(this._settings.submitButtonDisabledClass);
      this._buttonElement.disabled = true;
    }
  
    resetAndUpdateSubmitButton() {
      this._toggleSubmitButton();
    }
      
    _setEventListeners() {
      const inputs = this._formElement.querySelectorAll(this._settings.inputSelector);
  
      inputs.forEach((input) => {
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
  