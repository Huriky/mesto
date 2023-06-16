import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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
  editAvatarProfile,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "bfd7d203-e029-40c9-9e21-03cc5e56aced",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description",
  imageSelector: ".profile__image",
});

const popupWithImage = new PopupWithImage("#image_popup");

const popupWithFormProfile = new PopupWithForm("#edit_profile", (data) => {
  api
    .updateProfile(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const popupWithFormAvatar = new PopupWithForm("#new_avatar", (data) => {
  api
    .updateAvatar(data.avatarLink)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const popupWithFormCard = new PopupWithForm("#add_element", (data) => {
  const cardData = {
    name: data.elementName,
    link: data.elementLink,
  };
  api
    .addCard(cardData)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      section.addItem(cardElement);
    })
    .catch((error) => {
      console.log(error);
    });
});

const popupWithConfirmation = new PopupWithConfirmation("#modal");


popupWithFormCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithConfirmation.setEventListeners();

function handleLikeClick(card) {
  if (card.isLiked) {
    removeLike(card);
  } else {
    addLike(card);
  }
}

function addLike(card) {
  api
    .addLike(card._cardId)
    .then((data) => {
      card.updateLikes(data.likes);
    })
    .catch((error) => {
      console.log(error);
    });
}

function removeLike(card) {
  api
    .removeLike(card._cardId)
    .then((data) => {
      card.updateLikes(data.likes);
    })
    .catch((error) => {
      console.log(error);
    });
}

function handleDeleteClick(card) {
  popupWithConfirmation.open(() => {
    api.deleteElement(card._cardId)
      .then(() => {
        card.deleteElement();
      })
      .catch((error) => {
        console.error(error);
        // Здесь также можно добавить визуальные уведомления для пользователя
      });
  });
}

let currentUserId;

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    currentUserId = userData._id;
  })
  .catch((error) => {
    console.error(error);
  });

function createCard(cardData) {
  cardData.currentUserId = currentUserId; // Add this line
  const card = new Card(
    {
      data: cardData,
      handleCardClick: handleImagePopup,
      handleDeleteClick: handleDeleteClick,
      handleLikeClick: handleLikeClick
    },
    "#card-template"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const section = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".elements__grid"
);

  Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
.then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    currentUserId = userData._id;
    section.renderItems(initialCards.reverse());
})
.catch((error) => {
    console.error('Ошибка при получении данных:', error);
});

const editProfileFormValidator = new FormValidator(
  validationSettings,
  editProfileForm
);
editProfileFormValidator.enableValidation();

const addElementFormValidator = new FormValidator(
  validationSettings,
  addElementForm
);
addElementFormValidator.enableValidation();

const formValidatorAvatar = new FormValidator(
  validationSettings,
  document.getElementById("new_avatar_form")
);
formValidatorAvatar.enableValidation();

function handleImagePopup(src, caption) {
  popupWithImage.open({ link: src, name: caption });
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

editAvatarProfile.addEventListener("click", () => {
  popupWithFormAvatar.open();
  formValidatorAvatar.resetAndUpdateSubmitButton();
  formValidatorAvatar.clearInputErrors();
});