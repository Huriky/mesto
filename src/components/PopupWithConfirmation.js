import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirmation extends PopupWithForm {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(onSubmit) {
    super.open();
    this._handleFormSubmit = onSubmit;
  }
}