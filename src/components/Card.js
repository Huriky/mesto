export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector) {
    this._name = data.name; // Название карточки
    this._link = data.link; // Ссылка на изображение карточки
    this._likes = data.likes; // Массив пользователей, лайкнувших карточку
    this._userId = data.currentUserId; // ID текущего пользователя
    this._cardId = data._id; // ID карточки
    this._ownerId = data.owner._id; // ID владельца карточки
    this._cardSelector = cardSelector; // Селектор шаблона карточки
    this._handleCardClick = handleCardClick; // Функция обработчика клика по карточке
    this._handleDeleteClick = handleDeleteClick; // Функция обработчика удаления карточки
    this._handleLikeClick = handleLikeClick; // Функция обработчика лайка карточки
}

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true)
      .querySelector('.element');
    return cardElement;
  }
  
      
  _setEventListeners() {
    this.removeElement.addEventListener("click", () => this._handleDeleteClick(this)); // Добавление обработчика удаления карточки
    this._elementImage.addEventListener("click", () => {
    this._handleImageClick({ name: this._name, link: this._link }); // Добавление обработчика клика по карточке
        });
    this._likeElement.addEventListener("click", () =>
    this._handleLikeClick(this));
  }
  
  _handleImageClick() {
    const imageSrc = this._elementImage.src;
    const imageCaption = this._elementImage.caption;
    this._handleCardClick(imageSrc, imageCaption);
  };
  
  deleteElement() {
    this._element.remove();
  };
      
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
      
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementImage.caption = this._name;
    this._element.querySelector(".element__name").textContent = this._name;

    this._likeCounter = this._element.querySelector(".element__like_counter");

    this._likeElement = this._element.querySelector(".element__like");
        
    this.removeElement = this._element.querySelector(".element__basket")

    this.updateLikes(this._likes)
      
    this._setEventListeners();

      if (this._userId !== this._ownerId) {
          this.removeElement.remove();
      }
        
      return this._element;
  }

  updateLikes(likes) {
    this._likes = likes;
    this.isLiked = this._likes.some((like) => like._id === this._userId);
    this._likeElement.classList.toggle("element__like_active", this.isLiked);
    this._likeCounter.textContent = this._likes.length;
  }

      
}