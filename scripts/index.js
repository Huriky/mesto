import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initialCards.js';

  const editProfileButton = document.querySelector(".profile__name-edit");
  const closeEditProfileButton = document.querySelector(".popup__close-button");
  const editProfilePopup = document.querySelector("#edit_profile");
  const addElementPopup = document.querySelector("#add_element");
  const editProfileForm = document.querySelector("#profile_form");
  const openAddElementPopupButton = document.querySelector(".profile__button");
  const addElementForm = document.querySelector("#add_element_form");
  const closeAddElementPopupButton = document.querySelector("#submit-close-popup-element");
  const elementGrid = document.querySelector(".elements__grid");
  const imagePopup = document.querySelector("#image_popup");
  const popupImageView = imagePopup.querySelector(".popup__image");
  const popupImageCaption = imagePopup.querySelector(".popup__image-caption");
  const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");
  
  const titleElement = document.querySelector(".profile__name");
  const descriptionElement = document.querySelector(".profile__description");
  const titleInput = document.querySelector("#input-name");
  const descriptionInput = document.querySelector("#input-about");
  
  const nameInput = document.querySelector("#element-name");
  const linkInput = document.querySelector("#element-link");
  
  function createCard(cardData) {
    const card = new Card(cardData, "#card-template", deleteElement, handleImagePopup);
    const cardElement = card.generateCard();
    return cardElement;
}

  const handleAddElementSubmit = (evt) => {
    evt.preventDefault();
    const newCardElement = createCard({link:linkInput.value, name:nameInput.value});
    elementGrid.prepend(newCardElement);
    closePopup(addElementPopup);
    evt.target.reset();
    addElementFormValidator.resetAndUpdateSubmitButton();
  };

  const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: 'input',
    submitButtonSelector: '.popup__submit-button',
    errorClass: 'popup__error',
    submitButtonDisabledClass: 'popup__submit-button_disabled',
  };

  const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
editProfileFormValidator.enableValidation();

const addElementFormValidator = new FormValidator(validationSettings, addElementForm);
addElementFormValidator.enableValidation();

  
  const deleteElement = (evt) => {
  evt.target.closest('.element').remove();
  };
  
  const handleEditProfileSubmit = (evt) => {
    evt.preventDefault();
    titleElement.textContent = titleInput.value;
    descriptionElement.textContent = descriptionInput.value;
    closePopup(editProfilePopup);
  };
  
  function handleImagePopup(src, caption) {
    popupImageView.src = src;
    popupImageView.alt = caption;
    popupImageCaption.textContent = caption;
    openPopup(imagePopup);
  }
  
  function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleOverlayClose);
  }
  
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscClose);
    document.removeEventListener("click", handleOverlayClose);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const popups = document.querySelectorAll(".popup");
    popups.forEach((popup) => {
      popup.classList.add("popup_display");
    });
  });
  
  function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
  }
  
  function handleOverlayClose(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
  }

  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData);
    elementGrid.append(cardElement);
});  
  
  editProfileForm.addEventListener('submit', handleEditProfileSubmit); 
  addElementForm.addEventListener("submit", handleAddElementSubmit);
  
  editProfileButton.addEventListener("click", () => {
    openPopup(editProfilePopup);
    titleInput.value = titleElement.textContent;
    descriptionInput.value = descriptionElement.textContent;
    editProfileFormValidator.resetAndUpdateSubmitButton();
    editProfileFormValidator.clearInputErrors();
  });
  
  
  closeEditProfileButton.addEventListener("click", () => {
    closePopup(editProfilePopup);
  });
  
  openAddElementPopupButton.addEventListener("click", () => {
    openPopup(addElementPopup);
    addElementFormValidator.clearInputErrors();
  });
  
  closeAddElementPopupButton.addEventListener("click", () => {
    closePopup(addElementPopup);
  });
  
  imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));