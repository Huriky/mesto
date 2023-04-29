const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: 'input',
    submitButtonSelector: '.popup__submit-button',
    errorClass: 'popup__error',
    submitButtonDisabledClass: 'popup__submit-button_disabled',
  };
  
  function validateInput(input) {
    const errorElement = input.nextElementSibling;
  
    if (!input.validity.valid) {
      errorElement.textContent = input.validationMessage;
      errorElement.style.display = 'block';
    } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }
  
  function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
  
    forms.forEach((form) => {
      const inputs = form.querySelectorAll(settings.inputSelector);
  
      inputs.forEach((input) => {
        input.addEventListener('input', () => {
          validateInput(input);
          toggleSubmitButton(form, settings);
        });
      });
  
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
      toggleSubmitButton(form, settings);
    });
  }

  function disableButton(button, settings) {
    button.classList.add(settings.submitButtonDisabledClass);
    button.disabled = true;
  }
  
  function toggleSubmitButton(form, settings) {
    const submitButton = form.querySelector(settings.submitButtonSelector);
    const isValidForm = form.checkValidity();
  
    if (isValidForm) {
      submitButton.classList.remove(settings.submitButtonDisabledClass);
      submitButton.disabled = false;
    } else {
      disableButton(submitButton, settings);
    }
  }
  
  function resetSubmitButton(form, settings) {
    const submitButton = form.querySelector(settings.submitButtonSelector);
    disableButton(submitButton, settings);
  }
  
  enableValidation(validationSettings);