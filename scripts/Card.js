export default class Card {
    constructor(cardData, cardSelector, handleDelete, handleImagePopup) {
      this._name = cardData.name;
      this._link = cardData.link;
      this._cardSelector = cardSelector;
      this._handleDelete = handleDelete;
      this._handleImagePopup = handleImagePopup;
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
        .addEventListener("click", this._handleDelete);
        this._elementImage.addEventListener("click", this._handleImageClick.bind(this));
        this._element
        .querySelector(".element__like")
        .addEventListener("click", this._toggleLike);
    }               
  
      _handleImageClick() {
        const imageSrc = this._elementImage.src;
        const imageCaption = this._elementImage.caption;
        this._handleImagePopup(imageSrc, imageCaption);
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