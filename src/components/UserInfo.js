export default class UserInfo {
    // Конструктор класса принимает объект с селекторами элемента имени пользователя и элемента информации о себе
    constructor({ nameSelector, infoSelector }) {
      this._nameElement = document.querySelector(nameSelector); // Элемент имени пользователя
      this._infoElement = document.querySelector(infoSelector); // Элемент информации о себе
    }
  
    // Метод получения данных пользователя
    getUserInfo() {
      return {
        name: this._nameElement.textContent, // Имя пользователя
        info: this._infoElement.textContent // Информация о себе
      };
    }
  
    // Метод установки новых данных пользователя
    setUserInfo({ name, info }) {
      this._nameElement.textContent = name; // Установка имени пользователя
      this._infoElement.textContent = info; // Установка информации о себе
    }
  }
  