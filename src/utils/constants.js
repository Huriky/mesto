const editProfileButton = document.querySelector(".profile__name-edit");
const editProfileForm = document.querySelector("#profile_form");
const openAddElementPopupButton = document.querySelector(".profile__button");
const addElementForm = document.querySelector("#add_element_form");
const titleElement = document.querySelector(".profile__name");
const descriptionElement = document.querySelector(".profile__description");
const titleInput = document.querySelector("#input-name");
const descriptionInput = document.querySelector("#input-about");

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: 'input',
    submitButtonSelector: '.popup__submit-button',
    errorClass: 'popup__error',
    submitButtonDisabledClass: 'popup__submit-button_disabled',
  };

  export {
    editProfileButton,
    editProfileForm,
    openAddElementPopupButton,
    addElementForm,
    titleElement,
    descriptionElement,
    titleInput,
    descriptionInput,
    validationSettings,
  };