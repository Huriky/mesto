const profileNameEditButton = document.querySelector(".profile__name-edit");
const profileCloseButton = document.querySelector(".popup__close-button");
const popupElement = document.querySelector(".popup");
const formElement = document.querySelector("#profile_form");

let titleElement = document.querySelector(".profile__name");
let descriptionElement = document.querySelector(".profile__description");
let titleInput = document.querySelector("#input-name").value;
let descriptionInput = document.querySelector("#input-about").value;

const openPopup = () => {
    popupElement.classList.add("popup_opened");
    titleInput = titleElement.textContent;
    descriptionInput = descriptionElement.textContent;
};

const closePopup = () => {
    popupElement.classList.remove("popup_opened");
};

function handleFormSubmit (evt) {
    evt.preventDefault();
    titleInput = document.querySelector("#input-name").value;
    descriptionInput = document.querySelector("#input-about").value;
    titleElement.textContent = titleInput;
    descriptionElement.textContent = descriptionInput;
    closePopup(); 
}

profileNameEditButton.addEventListener("click", openPopup);

profileCloseButton.addEventListener("click", closePopup);

formElement.addEventListener('submit', handleFormSubmit); 
