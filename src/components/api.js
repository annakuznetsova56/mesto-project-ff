const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
    headers: {
        authorization: '52ce74cc-c12d-49ab-9ce7-42a4e4867e05',
        'Content-Type': 'application/json'
    }
  }

//получаем данные пользователя
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: config.headers.authorization
        }
      })
        .then(res => {
            if (res.ok) {
            return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//получаем карточки
export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: {
          authorization: config.headers.authorization
        }
      })
        .then(res => {
            if (res.ok) {
            return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//изменяем данные
export function editProfile (name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`
          })
      })
        .then(res => {
            if (res.ok) {
            return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export function editAvatar (link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${link}`
          })
      })
        .then(res => {
            if (res.ok) {
            return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//отправляем новую карточку
export function postNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`
          })
      })
        .then(res => {
            if (res.ok) {
            return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers 
    })
        .then(res => {
            if (res.ok) {
            return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers 
    })
        .then(res => {
            if (res.ok) {
            return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers  
    })
        .then(res => {
            if (res.ok) {
            return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
}