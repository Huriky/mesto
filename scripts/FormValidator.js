export default class FormValidator {
    constructor(settings, formElement) {
      this._settings = settings;
      this._formElement = formElement;
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
  
    _toggleSubmitButton() {
      const submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
      const isValidForm = this._formElement.checkValidity();
  
      submitButton.classList.toggle(this._settings.submitButtonDisabledClass, !isValidForm);
      submitButton.disabled = !isValidForm;
  }  
  
    _disableButton(button) {
      button.classList.add(this._settings.submitButtonDisabledClass);
      button.disabled = true;
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
  