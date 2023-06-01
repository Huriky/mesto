import './pages/index.css';
import Section from '../src/components/Section.js';
import Card from '../src/components/Card.js';
import FormValidator from '../src/components/FormValidator.js';
import initialCards from '../src/components/initialCards.js';
import PopupWithForm from '../src/components/PopupWithForm.js';
import PopupWithImage from '../src/components/PopupWithImage.js';
import UserInfo from '../src/components/UserInfo.js';

const editProfileButton = document.querySelector(".profile__name-edit");
const editProfileForm = document.querySelector("#profile_form");
const openAddElementPopupButton = document.querySelector(".profile__button");
const addElementForm = document.querySelector("#add_element_form");
const titleElement = document.querySelector(".profile__name");
const descriptionElement = document.querySelector(".profile__description");
const titleInput = document.querySelector("#input-name");
const descriptionInput = document.querySelector("#input-about");


const userInfo = new UserInfo({ nameSelector: ".profile__name", infoSelector: ".profile__description" });

const popupWithImage = new PopupWithImage("#image_popup");

const popupWithFormProfile = new PopupWithForm("#edit_profile", (data) => {
  userInfo.setUserInfo(data);
});

const popupWithFormCard = new PopupWithForm("#add_element", (data) => {
  const cardElement = createCard(data);
  cardsSection.addItem(cardElement);
});

popupWithFormCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();

// Перемещение объявления функции deleteElement выше
const deleteElement = (evt) => {
  evt.target.closest('.element').remove();
};

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", deleteElement, handleImagePopup);
  const cardElement = card.generateCard();
  return cardElement;
}

const section = new Section({
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
  }
}, '.elements__grid');

// Отрисовка элементов
section.renderItems(initialCards);

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

function handleImagePopup(src, caption) {
  popupWithImage.open({link: src, name: caption});
}

document.addEventListener("DOMContentLoaded", () => {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.classList.add("popup_display");
  });
});

editProfileButton.addEventListener("click", () => {
  popupWithFormProfile.open();
  titleInput.value = titleElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
  editProfileFormValidator.resetAndUpdateSubmitButton();
  editProfileFormValidator.clearInputErrors();
});

openAddElementPopupButton.addEventListener("click", () => {
  popupWithFormCard.open();
  addElementFormValidator.clearInputErrors();
});