const profileNameEditButton = document.querySelector(".profile__name-edit");
const profileCloseButton = document.querySelector(".popup__close-button");
const popupElement = document.querySelector("#edit_profile");
const popupAddElement = document.querySelector("#add_element");
const formElement = document.querySelector("#profile_form");
let deleteElementButtons = document.querySelectorAll(".element__basket");
const openAddPopupButton = document.querySelector(".profile__button");
let cardElement = document.querySelector(".element").cloneNode(true);
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

const openPopup = () => {
    popupElement.classList.add("popup_opened");
    titleInput.value = titleElement.textContent;
    descriptionInput.value = descriptionElement.textContent;
};

const openAddPopup = () => {
    popupAddElement.classList.add("popup_opened");
    nameInput.value = '';
    linkInput.value = '';
};

const closePopup = () => {
    popupElement.classList.remove("popup_opened");
};

const closeAddPopup = () => {
    popupAddElement.classList.remove("popup_opened");

};
const deleteElement = (evt) => {
    evt.target.parentNode.remove();
};

const addElement = (evt) => {
    evt.preventDefault();
    const newCardElement = document.querySelector("#card-template").content.cloneNode(true);
    newCardElement.querySelector(".element__image").src = linkInput.value;
    newCardElement.querySelector(".element__name").textContent = nameInput.value;
    newCardElement.querySelector(".element__basket").addEventListener("click", deleteElement);
    newCardElement.querySelector(".element__image").addEventListener("click", handleImageClick);
    newCardElement.querySelector(".element__like").addEventListener("click", toggleLike);
    elementGrid.append(newCardElement);
    closeAddPopup();
};


function handleFormSubmit (evt) {
    evt.preventDefault();
    titleElement.textContent = titleInput.value;
    descriptionElement.textContent = descriptionInput.value;
    closePopup(); 
}

const openImagePopup = (src, caption) => {
    popupImageView.src = src;
    popupImageCaption.textContent = caption;
    imagePopup.classList.add("popup_opened");
};

const closeImagePopup = () => {
    imagePopup.classList.remove("popup_opened");
};

const handleImageClick = (evt) => {
    const imageSrc = evt.target.src;
    const imageCaption = evt.target.parentNode.querySelector(".element__name").textContent;
    openImagePopup(imageSrc, imageCaption);
};

elementImages.forEach((image) => {
    image.addEventListener("click", handleImageClick);
});

const toggleLike = (evt) => {
    evt.target.classList.toggle("element__like_active");
};

profileNameEditButton.addEventListener("click", openPopup);

profileCloseButton.addEventListener("click", closePopup);

formElement.addEventListener('submit', handleFormSubmit); 

deleteElementButtons.forEach(element => {
    element.addEventListener("click", deleteElement);
})

openAddPopupButton.addEventListener("click", openAddPopup);

saveAddElementForm.addEventListener("submit", addElement);

closeAddPopupButton.addEventListener("click", closeAddPopup);

imagePopupCloseButton.addEventListener("click", closeImagePopup);

elementLikes.forEach((like) => {
    like.addEventListener("click", toggleLike);
});


