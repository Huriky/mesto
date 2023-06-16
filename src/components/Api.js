export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    // Метод для выполнения GET-запроса
    _get(url) {
      return fetch(`${this._baseUrl}${url}`, {
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    // Метод для обработки ответа от сервера
    _handleResponse(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }
  
    // Метод для получения начальных карточек
    getInitialCards() {
      return this._get('/cards');
    }
    
    getUserInfo() {
        return this._get('/users/me');
      }
  

      updateProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(data),
        })
          .then(this._handleResponse);
      }

      updateAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({avatar: data}),
        })
          .then(this._handleResponse);
      }
      
      addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(data)
        })
          .then(this._handleResponse);
      }

      addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: this._headers,
        })
          .then(this._handleResponse);
      }
      
      removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        })
          .then(this._handleResponse);
      }

      deleteElement(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        })
          .then(this._handleResponse);
      }
      
  
  }