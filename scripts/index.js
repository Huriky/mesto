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
const profileNameEditButton = document.querySelector(".profile__name-edit");
const profileCloseButton = document.querySelector(".popup__close-button");
const popupElement = document.querySelector("#edit_profile");
const popupAddElement = document.querySelector("#add_element");
const formElement = document.querySelector("#profile_form");
const deleteElementButtons = document.querySelectorAll(".element__basket");
const openAddPopupButton = document.querySelector(".profile__button");
const saveAddElementForm = document.querySelector("#add_element_form");
const closeAddPopupButton = document.querySelector("#submit-close-popup-element");
const elementGrid = document.querySelector(".elements__grid");
const imagePopup = document.querySelector("#image_popup");
const popupImageView = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__image-caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");
const elementImages = document.querySelectorAll(".element__image");
const elementLikes = document.querySelectorAll(".element__like");

let titleElement = document.querySelector(".profile__name");
let descriptionElement = document.querySelector(".profile__description");
let titleInput = document.querySelector("#input-name");
let descriptionInput = document.querySelector("#input-about");

let nameInput = document.querySelector("#element-name");
let linkInput = document.querySelector("#element-link");

const deleteElement = (evt) => {
    evt.target.closest.remove();
};

const addElement = (evt) => {
    evt.preventDefault();
    const newCardElement = document.querySelector("#card-template").content.cloneNode(true);
    newCardElement.querySelector(".element__image").src = linkInput.value;
    newCardElement.querySelector(".element__name").textContent = nameInput.value;
    newCardElement.querySelector(".element__basket").addEventListener("click", deleteElement);
    newCardElement.querySelector(".element__image").addEventListener("click", handleImageClick);
    newCardElement.querySelector(".element__like").addEventListener("click", toggleLike);
    elementGrid.prepend(newCardElement);
    closePopup(popupAddElement);
};

function createCard(cardData) {
    const newCardElement = document.querySelector("#card-template").content.cloneNode(true);
    newCardElement.querySelector(".element__image").src = cardData.link;
    newCardElement.querySelector(".element__name").textContent = cardData.name;
    newCardElement.querySelector(".element__basket").addEventListener("click", deleteElement);
    newCardElement.querySelector(".element__image").addEventListener("click", handleImageClick);
    newCardElement.querySelector(".element__like").addEventListener("click", toggleLike);
    return newCardElement;
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    titleElement.textContent = titleInput.value;
    descriptionElement.textContent = descriptionInput.value;
    closePopup(popupElement); 
}

const handleImageClick = (evt) => {
    const imageSrc = evt.target.src;
    const imageCaption = evt.target.closest.querySelector(".element__name").textContent;
    openImagePopup(imageSrc, imageCaption);
};

const openImagePopup = (src, caption) => {
    popupImageView.src = src;
    popupImageView.alt = caption;
    popupImageCaption.textContent = caption;
    imagePopup.classList.add("popup_opened");
};

const toggleLike = (evt) => {
    evt.target.classList.toggle("element__like_active");
};

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

formElement.addEventListener('submit', handleFormSubmit); 

saveAddElementForm.addEventListener("submit", addElement);

profileNameEditButton.addEventListener("click", () => openPopup(popupElement));

profileCloseButton.addEventListener("click", () => closePopup(popupElement));

openAddPopupButton.addEventListener("click", () => openPopup(popupAddElement));

closeAddPopupButton.addEventListener("click", () => closePopup(popupAddElement));

imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));

initialCards.forEach(cardData => {
    const card = createCard(cardData);
    elementGrid.append(card);
});
