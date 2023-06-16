export default class UserInfo {
  // Конструктор класса принимает объект с селекторами элемента имени пользователя и элемента информации о себе
  constructor({ nameSelector, infoSelector, imageSelector }) {
    this._nameElement = document.querySelector(nameSelector); // Элемент имени пользователя
    this._infoElement = document.querySelector(infoSelector); // Элемент информации о себе
    this._profileImage = document.querySelector(imageSelector); // Элемент аватара пользователя
  }

  // Метод получения данных пользователя
  getUserInfo() {
    return this.data;
  }

  // Метод установки новых данных пользователя
  setUserInfo(userData) {
    this.data = userData;
    this._nameElement.textContent = this.data.name; // Установка имени пользователя
    this._infoElement.textContent = this.data.about; // Установка информации о себе
    this._profileImage.src = this.data.avatar; // Установка аватара пользователя
  }
}
