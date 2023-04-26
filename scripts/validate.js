function toggleSubmitButton(form) {
    const submitButton = form.querySelector('.popup__submit-button');
    const inputs = form.querySelectorAll('input');
    const allInputsValid = Array.from(inputs).every(input => input.validity.valid);
  
    if (allInputsValid) {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove('popup__submit-button_disabled');
    } else {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add('popup__submit-button_disabled');
    }
  }
  
  function addValidationListeners(form) {
    const inputs = form.querySelectorAll('input');
  
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        validateInput(input);
        toggleSubmitButton(form);
      });
    });
  
    document.addEventListener('DOMContentLoaded', () => toggleSubmitButton(form));
  }
  
  addValidationListeners(formElement);
  
  addValidationListeners(saveAddElementForm);