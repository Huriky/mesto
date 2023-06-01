export default class Card {
  constructor(cardData, cardSelector, handleDelete, handleCardClick) {
    this._name = cardData.name; // Название карточки
    this._link = cardData.link; // Ссылка на изображение карточки
    this._cardSelector = cardSelector; // Селектор шаблона карточки
    this._handleDelete = handleDelete; // Функция обработчика удаления карточки
    this._handleCardClick = handleCardClick; // Функция обработчика клика по карточке
  }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content.cloneNode(true);
        return cardElement;
      }
      
    _setEventListeners() {
      this._element
        .querySelector(".element__basket")
        .addEventListener("click", this._handleDelete); // Добавление обработчика удаления карточки
        this._elementImage.addEventListener("click", () => {
          this._handleImageClick({ name: this._name, link: this._link }); // Добавление обработчика клика по карточке
        });
      this._element
        .querySelector(".element__like")
        .addEventListener("click", this._toggleLike); // Добавление обработчика отметки "понравившейся" карточки
    }
  
      _handleImageClick() {
        const imageSrc = this._elementImage.src;
        const imageCaption = this._elementImage.caption;
        this._handleCardClick(imageSrc, imageCaption);
    }
                                   
    _toggleLike(evt) {
        evt.target.classList.toggle("element__like_active");
      }
      
    generateCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector(".element__image");
      
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementImage.caption = this._name;
        this._element.querySelector(".element__name").textContent = this._name;
      
        this._setEventListeners();
      
        return this._element;
      }
  }