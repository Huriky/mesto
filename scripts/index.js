const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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
const elementImages = document.querySelectorAll(".element__image");
const elementLikes = document.querySelectorAll(".element__like");

const titleElement = document.querySelector(".profile__name");
const descriptionElement = document.querySelector(".profile__description");
const titleInput = document.querySelector("#input-name");
const descriptionInput = document.querySelector("#input-about");

const nameInput = document.querySelector("#element-name");
const linkInput = document.querySelector("#element-link");

function createCard(cardData) {
  const newCardElement = document.querySelector("#card-template").content.cloneNode(true);
  const elementImage = newCardElement.querySelector(".element__image");
  
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  newCardElement.querySelector(".element__name").textContent = cardData.name;
  
  newCardElement.querySelector(".element__basket").addEventListener("click", deleteElement);
  elementImage.addEventListener("click", handleImageClick);
  newCardElement.querySelector(".element__like").addEventListener("click", toggleLike);
  
  return newCardElement;
}

const handleAddElementSubmit = (evt) => {
  evt.preventDefault();
  const newCardElement = createCard({link:linkInput.value, name:nameInput.value});
  elementGrid.prepend(newCardElement);
  closePopup(addElementPopup);
  evt.target.reset();
  resetSubmitButton(addElementForm, validationSettings)
};

const deleteElement = (evt) => {
evt.target.closest('.element').remove();
};

function handleEditProfileSubmit (evt) {
  evt.preventDefault();
  titleElement.textContent = titleInput.value;
  descriptionElement.textContent = descriptionInput.value;
  closePopup(editProfilePopup); 
}

const handleImageClick = (evt) => {
const imageSrc = evt.target.src;
const imageCaption = evt.target.closest(".element").querySelector(".element__name").textContent;
handleImagePopup(imageSrc, imageCaption);
};

function handleImagePopup(src, caption) {
popupImageView.src = src;
popupImageView.alt = caption;
popupImageCaption.textContent = caption;
openPopup(imagePopup);
}

const toggleLike = (evt) => {
  evt.target.classList.toggle("element__like_active");
};

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

editProfileForm.addEventListener('submit', handleEditProfileSubmit); 
addElementForm.addEventListener("submit", handleAddElementSubmit);

editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  titleInput.value = titleElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
  toggleSubmitButton(editProfileForm, validationSettings);
});

closeEditProfileButton.addEventListener("click", () => {
  closePopup(editProfilePopup);
});

openAddElementPopupButton.addEventListener("click", () => {
  openPopup(addElementPopup);
});

closeAddElementPopupButton.addEventListener("click", () => {
  closePopup(addElementPopup);
});

imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));

initialCards.forEach(cardData => {
  const card = createCard(cardData);
  elementGrid.append(card);
});