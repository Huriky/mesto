const profileNameEditButton = document.querySelector(".profile__name-edit");
const profileCloseButton = document.querySelector(".popup__close-button");
const popupElement = document.querySelector(".popup");
const formElement = document.querySelector("#profile_form");

let titleElement = document.querySelector(".profile__name");
let descriptionElement = document.querySelector(".profile__description");
let titleInput = document.querySelector("#input-name");
let descriptionInput = document.querySelector("#input-about");

const openPopup = () => {
    popupElement.classList.add("popup_opened");
    titleInput.value = titleElement.textContent;
    descriptionInput.value = descriptionElement.textContent;
};

const closePopup = () => {
    popupElement.classList.remove("popup_opened");
};

function handleFormSubmit (evt) {
    evt.preventDefault();
    titleElement.textContent = titleInput.value;
    descriptionElement.textContent = descriptionInput.value;
    closePopup(); 
}

profileNameEditButton.addEventListener("click", openPopup);

profileCloseButton.addEventListener("click", closePopup);

formElement.addEventListener('submit', handleFormSubmit); 
