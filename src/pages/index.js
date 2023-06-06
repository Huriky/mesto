import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../utils/initialCards.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  editProfileButton,
    editProfileForm,
    openAddElementPopupButton,
    addElementForm,
    titleElement,
    descriptionElement,
    titleInput,
    descriptionInput,
    validationSettings,
} from '../utils/constants.js';


const userInfo = new UserInfo({ nameSelector: ".profile__name", infoSelector: ".profile__description" });

const popupWithImage = new PopupWithImage("#image_popup");

const popupWithFormProfile = new PopupWithForm("#edit_profile", (data) => {
  const userData = {
    name: data.newName,
    info: data.newAbout 
  };
  userInfo.setUserInfo(userData);
});


const popupWithFormCard = new PopupWithForm("#add_element", (data) => {
  const cardData = {
    name: data.elementName,
    link: data.elementLink
  };
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
});


popupWithFormCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();


function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImagePopup);
  const cardElement = card.generateCard();
  return cardElement;
};

const section = new Section({
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
  }
}, '.elements__grid');

// Отрисовка элементов
section.renderItems(initialCards);

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
  addElementFormValidator.resetAndUpdateSubmitButton();
  addElementFormValidator.clearInputErrors();
});