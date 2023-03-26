const profileNameEditButton = document.querySelector(".profile__name-edit");
const profileCloseButton = document.querySelector(".popup__close-button");
const popupElement = document.querySelector(".popup");
const saveProfileButton = document.querySelector(".popup__submit-button");
const formElement = document.querySelector("#profile_form");

const openPopup = () => {
  popupElement.classList.add("popup_opened");
};

const closePopup = () => {
    popupElement.classList.remove("popup_opened");
};

const saveProfile = () => {
    let titleElement = document.querySelector(".profile__name");
    let descriptionElement = document.querySelector(".profile__description");
    let title = document.querySelector("#input-name").value;
    let description = document.querySelector("#input-about").value;
    if (titleElement, descriptionElement, title, description) {
        titleElement.innerHTML = title;
        descriptionElement.innerHTML = description;
        closePopup(); 
    }
    
};

profileNameEditButton.addEventListener("click", openPopup);

profileCloseButton.addEventListener("click", closePopup);

saveProfileButton.addEventListener("click", saveProfile);


function handleFormSubmit (evt) {
    evt.preventDefault(); 
}

formElement.addEventListener('submit', handleFormSubmit); 

