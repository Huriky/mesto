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

    function enableValidation() {
        const forms = document.querySelectorAll('.popup__form');
      
        forms.forEach((form) => {
          const inputs = form.querySelectorAll('input');
      
          inputs.forEach((input) => {
            input.addEventListener('input', () => {
              validateInput(input);
              toggleSubmitButton(form);
            });
          });
      
          form.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
      
          toggleSubmitButton(form);
        });
      }      

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

  function resetSubmitButton(form) {
    const submitButton = form.querySelector(".popup__submit-button");
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add("popup__submit-button_disabled");
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
  
  enableValidation();
